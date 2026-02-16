from flask import Blueprint, request, jsonify
from app.extensions import db 
from app.models import Incident
from app.schemas import IncidentSchema
from sqlalchemy import or_

incident_bp = Blueprint("incidents", __name__, url_prefix="/api/incidents")
incident_schema = IncidentSchema()
incidents_schema = IncidentSchema(many=True)

@incident_bp.route("", methods=["POST"])
def create_incident():
    data = request.get_json()
    errors = incident_schema.validate(data)
    if errors:
        return jsonify({"errors": errors}), 400
    incident = Incident(**data)
    db.session.add(incident)
    db.session.commit()
    return jsonify({
        "message": "Incident created successfully",
        "incident": incident_schema.dump(incident)
    }), 201

@incident_bp.route("", methods=["GET"])
def list_incidents():
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 20, type=int)
    severity_filter = request.args.get("severity")
    status_filter = request.args.get("status")
    search = request.args.get("search")
    sort_by = request.args.get("sort_by", "created_at")
    sort_order = request.args.get("sort_order", "desc")

    query = Incident.query

    # Filtering
    if severity_filter:
        query = query.filter_by(severity=severity_filter)

    if status_filter:
        query = query.filter_by(status=status_filter)

    # 🔍 Search across multiple fields
    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            or_(
                Incident.title.ilike(search_pattern),
                Incident.service.ilike(search_pattern),
                Incident.owner.ilike(search_pattern)
            )
        )
    allowed_sort_fields = ["created_at", "severity", "status", "title"]
    if sort_by not in allowed_sort_fields:
        sort_by = "created_at"

    column = getattr(Incident, sort_by)

    if sort_order == "desc":
        query = query.order_by(column.desc())
    else:
        query = query.order_by(column)

    pagination = query.paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        "total": pagination.total,
        "page": page,
        "per_page": per_page,
        "pages": pagination.pages,
        "incidents": incidents_schema.dump(pagination.items)
    })

@incident_bp.route("/<string:incident_id>", methods=["GET"])
def get_incident(incident_id):
    incident = Incident.query.get_or_404(incident_id)
    return jsonify(incident_schema.dump(incident))

@incident_bp.route("/<string:incident_id>", methods=["PATCH"])
def update_incident(incident_id):
    incident = Incident.query.get_or_404(incident_id)
    data = request.get_json()
    errors = incident_schema.validate(data, partial=True)
    if errors:
        return jsonify({"errors": errors}), 400
    for key, value in data.items():
        setattr(incident, key, value)
    db.session.commit()
    return jsonify(incident_schema.dump(incident))
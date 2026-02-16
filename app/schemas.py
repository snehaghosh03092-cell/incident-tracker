from marshmallow import Schema, fields, validate
from .models import Incident

class IncidentSchema(Schema):
    id = fields.Str(dump_only=True)
    title = fields.Str(required=True, validate=validate.Length(min=1))
    service = fields.Str(required=True)
    severity = fields.Str(required=True, validate=validate.OneOf(["SEV1", "SEV2", "SEV3", "SEV4"]))
    status = fields.Str(required=True, validate=validate.OneOf(["OPEN", "MITIGATED", "RESOLVED"]))
    owner = fields.Str(allow_none=True)
    summary = fields.Str(allow_none=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
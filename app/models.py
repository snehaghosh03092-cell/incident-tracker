import uuid
from datetime import datetime
from app.extensions import db 

class Incident(db.Model):
    __tablename__ = "incidents"
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = db.Column(db.String(255), nullable=False)
    service = db.Column(db.String(255), nullable=False)
    severity = db.Column(
        db.Enum("SEV1", "SEV2", "SEV3", "SEV4", name="severity_enum"), nullable=False
    )
    status = db.Column(
        db.Enum("OPEN", "MITIGATED", "RESOLVED", name="status_enum"), default="OPEN", nullable=False
    )
    owner = db.Column(db.String(200))
    summary = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f"<Incident {self.title} ({self.id})"
    
    
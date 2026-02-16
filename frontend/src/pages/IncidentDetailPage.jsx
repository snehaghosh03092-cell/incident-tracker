import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { fetchIncidentById, updateIncident } from "../api/incidentsApi";

const IncidentDetailPage = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [originalStatus, setOriginalStatus] = useState("");
  const [originalIncident, setOriginalIncident] = useState(null);
  const [success, setSuccess] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    fetchIncidentById(id)
      .then((res) => {
        console.log("DETAIL RESPONSE:", res.data);
        setIncident(res.data);
        setOriginalStatus(res.data.status);
        setOriginalIncident(res.data); 
      })
      .catch((err) => {
        console.error("Failed to fetch incident:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleSave = () => {
    updateIncident(id, {
      title: incident.title,
      summary: incident.summary,
      service: incident.service,
      owner: incident.owner,
      severity: incident.severity,
      status: incident.status
    })
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });
  };

  if (loading) {
    return <div className="page">Loading...</div>;
  }

  if (!incident) {
    return <div className="page">Incident not found</div>;
  }

  const isChanged =
  incident.title !== originalIncident?.title ||
  incident.summary !== originalIncident?.summary ||
  incident.service !== originalIncident?.service ||
  incident.owner !== originalIncident?.owner ||
  incident.severity !== originalIncident?.severity ||
  incident.status !== originalIncident?.status;

  return (
    <div className="page">
      <button
        className="back-link"
        onClick={() => navigate("/")}
      >
        <span className="arrow">←</span>
        Back to Incidents
      </button>
      {success && (
      <div className="success-msg">
        Updated successfully
      </div>
    )}
    <div className="detail-card">
    <div className="detail-section">
      <input
        className="title-input"
        value={incident.title || ""}
        onChange={(e) =>
          setIncident({ ...incident, title: e.target.value })
        }
      />
    </div>
    <div className="detail-section">
      <textarea
        className="summary-input"
        placeholder="Add summary..."
        value={incident.summary || ""}
        onChange={(e) =>
          setIncident({ ...incident, summary: e.target.value })
        }
      />
    </div>
    <div className="detail-grid">
      <div className="detail-item">
        <label>Service</label>
        <input
          className="text-input"
          value={incident.service || ""}
          onChange={(e) =>
            setIncident({ ...incident, service: e.target.value })
          }
        />
      </div>
      <div className="detail-item">
        <label>Owner</label>
        <input
          className="text-input"
          value={incident.owner || ""}
          onChange={(e) =>
            setIncident({ ...incident, owner: e.target.value })
          }
        />
      </div>
      <div className="detail-item">
        <label>Severity</label>
        <select
          className="text-input"
          value={incident.severity}
          onChange={(e) =>
            setIncident({ ...incident, severity: e.target.value })
          }
        >
          <option value="SEV1">SEV1</option>
          <option value="SEV2">SEV2</option>
          <option value="SEV3">SEV3</option>
          <option value="SEV4">SEV4</option>
        </select>
      </div>
      <div className="detail-item">
        <label>Status</label>
        <select
          className="text-input"
          value={incident.status}
          onChange={(e) =>
            setIncident({ ...incident, status: e.target.value })
          }
        >
          <option value="OPEN">OPEN</option>
          <option value="MITIGATED">MITIGATED</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>
      </div>
      <div className="detail-item readonly">
        <label>Created</label>
        <span>{formatDate(incident.created_at)}</span>
      </div>
      <div className="detail-item readonly">
        <label>Last Updated</label>
        <span>{formatDate(incident.updated_at)}</span>
      </div>
    </div>
    <button
      className="save-btn"
      disabled={!isChanged}
      onClick={handleSave}
    >
      Save Changes
    </button>
    </div>
    </div>
  );
}

export default IncidentDetailPage;

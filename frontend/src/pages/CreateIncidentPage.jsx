import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createIncident } from "../api/incidentsApi";

const CreateIncidentPage = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    summary: "",
    service: "",
    owner: "",
    severity: "SEV3",
    status: "OPEN",
  });

  const handleChange = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    createIncident(form)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error("Create failed:", err);
      });
  };

  return (
        <div className="page">
          <div className="detail-card">
            <h2 className="page-title">Create Incident</h2>
            <div className="form-section">
              <label>Title</label>
              <input
                className="text-input"
                value={form.title}
                onChange={(e) =>
                  handleChange("title", e.target.value)
                }
              />
            </div>
            <div className="form-section">
              <label>Summary</label>
              <textarea
                className="summary-input"
                placeholder="Describe the issue..."
                value={form.summary}
                onChange={(e) =>
                  handleChange("summary", e.target.value)
                }
              />
            </div>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Service</label>
                <input
                  className="text-input"
                  value={form.service}
                  onChange={(e) =>
                    handleChange("service", e.target.value)
                  }
                />
              </div>
              <div className="detail-item">
                <label>Owner</label>
                <input
                  className="text-input"
                  value={form.owner}
                  placeholder="Assign owner..."
                  onChange={(e) =>
                    handleChange("owner", e.target.value)
                  }
                />
              </div>
              <div className="detail-item">
                <label>Severity</label>
                <select
                  className="text-input"
                  value={form.severity}
                  onChange={(e) =>
                    handleChange("severity", e.target.value)
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
                  value={form.status}
                  onChange={(e) =>
                    handleChange("status", e.target.value)
                  }
                >
                  <option value="OPEN">OPEN</option>
                  <option value="MITIGATED">MITIGATED</option>
                  <option value="RESOLVED">RESOLVED</option>
                </select>
              </div>
            </div>
            <button
              className="save-btn"
              disabled={!form.title || !form.service}
              onClick={handleSubmit}
            >
              Create Incident
            </button>
          </div>
        </div>
  );
};

export default CreateIncidentPage;

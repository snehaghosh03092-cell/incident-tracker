import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api"
});

export const fetchIncidents = (params) => {
    return api.get("/incidents", { params });
  };

export const fetchIncidentById = (id) =>
  api.get(`/incidents/${id}`);

export const updateIncident = (id, data) =>
  api.patch(`/incidents/${id}`, data);

export const createIncident = (data) =>
  api.post("/incidents", data);
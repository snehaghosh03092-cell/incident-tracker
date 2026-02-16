import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import { fetchIncidents } from "./api/incidentsApi";

import IncidentsPage from "./pages/IncidentsPage";
import IncidentDetailPage from "./pages/IncidentDetailPage";
import CreateIncidentPage from "./pages/CreateIncidentPage";

import "./App.css";

const App = () => {

  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    setLoading(true);
    fetchIncidents({
      page,
      per_page: 20,
      search,
      severity,
      status,
      sort_by: sortBy,
      sort_order: sortOrder
    })
    .then((res) => {
      setIncidents(res.data.incidents);
      setTotalPages(res.data.pages);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [page, search, severity, status]);

  return (
    <div className="page">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IncidentsPage />} />
        <Route path="/incidents/:id" element={<IncidentDetailPage />} />
        <Route path="/incidents/new" element={<CreateIncidentPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;



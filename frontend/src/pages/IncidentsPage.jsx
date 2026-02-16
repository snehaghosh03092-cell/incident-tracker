import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import FiltersToolbar from "../components/FiltersToolbar";
import IncidentTable from "../components/IncidentTable";
import Pagination from "../components/Pagination";

import { fetchIncidents } from "../api/incidentsApi";

const IncidentsPage = () => {

  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

  const navigate = useNavigate();

  const handleCreateIncident = () => {
    navigate("/incidents/new");
  };

  useEffect(() => {
    setLoading(true);
    fetchIncidents({
      page,
      per_page: 20,
      search,
      severity,
      status,
      sort_by: sortBy,
      sort_order: sortOrder,
    })
      .then((res) => {
        setIncidents(res.data.incidents);
        setTotalPages(res.data.pages);
      })
      .catch((err) => {
        console.error("Failed to fetch incidents:", err);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [page, search, severity, status, sortBy, sortOrder]);

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
        <div>
          <Header onCreate={handleCreateIncident} />
          <FiltersToolbar
            search={search}
            severity={severity}
            status={status}
            onSearchChange={(value) => {
                setPage(1);
                setSearch(value);
            }}
            onSeverityChange={(value) => {
                setPage(1);
                setSeverity(value);
            }}
            onStatusChange={(value) => {
                setPage(1);
                setStatus(value);
            }}
         />
         <IncidentTable
            incidents={incidents}
            loading={loading}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
         />
         <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
         />
        </div>
      );
};

export default IncidentsPage;


  

  

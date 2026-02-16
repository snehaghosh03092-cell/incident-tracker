import { useMemo } from "react";
import debounce from "lodash.debounce";

const FiltersToolbar = ({
    search,
    severity,
    status,
    onSearchChange,
    onSeverityChange,
    onStatusChange,
  }) => {

    const debouncedSearch = useMemo(
        () =>
          debounce((value) => {
            onSearchChange(value);
          }, 500),
        [onSearchChange]
    );

    return (
      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search incidents..."
          defaultValue={search}
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        <select
          className="filter-select"
          value={severity}
          onChange={(e) => onSeverityChange(e.target.value)}
        >
          <option value="">All Severity</option>
          <option value="SEV1">SEV1</option>
          <option value="SEV2">SEV2</option>
          <option value="SEV3">SEV3</option>
          <option value="SEV4">SEV4</option>
        </select>
        <select
          className="filter-select"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="OPEN">OPEN</option>
          <option value="MITIGATED">MITIGATED</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>
      </div>
    );
  };

  export default FiltersToolbar;
  
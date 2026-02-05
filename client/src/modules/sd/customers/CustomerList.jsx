// src/modules/sd/customers/CustomerList.jsx
import { useMemo, useState } from "react";

function safeLower(v) {
  return (v ?? "").toString().toLowerCase();
}

export default function CustomerList({
  customers = [],
  selectedId,
  onSelect,
}) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("name"); // name | company | activity
  const [sortDir, setSortDir] = useState("asc");  // asc | desc

  const derivedCustomers = useMemo(() => {
    const q = safeLower(query).trim();

    // 1) filter
    const filtered = !q
      ? customers
      : customers.filter((c) => {
          const haystack = [
            c.name,
            c.company,
            c.email,
            c.phone,
          ]
            .map((x) => (x ?? "").toString())
            .join(" ")
            .toLowerCase();

          return haystack.includes(q);
        });

    // 2) sort
    const dir = sortDir === "asc" ? 1 : -1;

    const sorted = [...filtered].sort((a, b) => {
      let av, bv;

      switch (sortKey) {
        case "company":
          av = safeLower(a.company);
          bv = safeLower(b.company);
          return av.localeCompare(bv) * dir;

        case "activity":
          av = a.activity?.length || 0;
          bv = b.activity?.length || 0;
          return (av - bv) * dir;

        case "name":
        default:
          av = safeLower(a.name);
          bv = safeLower(b.name);
          return av.localeCompare(bv) * dir;
      }
    });

    return sorted;
  }, [customers, query, sortKey, sortDir]);

  function toggleSort(nextKey) {
    if (nextKey === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(nextKey);
      setSortDir("asc");
    }
  }

  return (
    <div className="list-pane">
      <div className="list-header" style={{ display: "grid", gap: 8 }}>
        <input
          className="search"
          placeholder="Search customers… (name, company, email)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            type="button"
            className={sortKey === "name" ? "active" : ""}
            onClick={() => toggleSort("name")}
          >
            Name {sortKey === "name" ? (sortDir === "asc" ? "↑" : "↓") : ""}
          </button>

          <button
            type="button"
            className={sortKey === "company" ? "active" : ""}
            onClick={() => toggleSort("company")}
          >
            Company {sortKey === "company" ? (sortDir === "asc" ? "↑" : "↓") : ""}
          </button>

          <button
            type="button"
            className={sortKey === "activity" ? "active" : ""}
            onClick={() => toggleSort("activity")}
          >
            Activity {sortKey === "activity" ? (sortDir === "asc" ? "↑" : "↓") : ""}
          </button>

          <div style={{ marginLeft: "auto", opacity: 0.7 }}>
            {derivedCustomers.length} / {customers.length}
          </div>
        </div>
      </div>

      <ul className="list">
        {derivedCustomers.length === 0 ? (
          <li style={{ padding: "1rem", opacity: 0.6 }}>
            No matching customers.
          </li>
        ) : (
          derivedCustomers.map((customer) => (
            <li
              key={customer._id}
              className={customer._id === selectedId ? "selected" : ""}
              onClick={() => onSelect(customer._id)}
            >
              <div className="title">{customer.name}</div>
              <div className="subtitle">{customer.company || "—"}</div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

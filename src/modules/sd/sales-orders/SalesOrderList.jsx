import { useMemo, useState } from "react";

function safeLower(v) {
  return (v ?? "").toString().toLowerCase();
}

function normalizeStatus(s) {
  const val = (s ?? "").toString().toUpperCase();
  // optional: define an ordering for statuses
  const rank = { QUOTE: 0, OPEN: 1, DELIVERED: 2, CLOSED: 3 };
  return { val, rank: rank[val] ?? 999 };
}

export default function SalesOrderList({ orders = [], selectedId, onSelect }) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("number"); // number | customer | status | total
  const [sortDir, setSortDir] = useState("asc");    // asc | desc

  const filteredSorted = useMemo(() => {
    const q = safeLower(query).trim();

    // 1) filter
    const filtered = !q
      ? orders
      : orders.filter((o) => {
          const haystack = [
            o.number,
            o.customerName,
            o.status,
            o._id,
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
        case "customer":
          av = safeLower(a.customerName);
          bv = safeLower(b.customerName);
          return av.localeCompare(bv) * dir;

        case "status": {
          const as = normalizeStatus(a.status);
          const bs = normalizeStatus(b.status);
          // rank first, then alphabetical
          if (as.rank !== bs.rank) return (as.rank - bs.rank) * dir;
          return as.val.localeCompare(bs.val) * dir;
        }

        case "total":
          av = Number(a.total) || 0;
          bv = Number(b.total) || 0;
          return (av - bv) * dir;

        case "number":
        default:
          av = Number(a.number) || 0;
          bv = Number(b.number) || 0;
          return (av - bv) * dir;
      }
    });

    return sorted;
  }, [orders, query, sortKey, sortDir]);

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
          placeholder="Search orders… (number, customer, status)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            type="button"
            className={sortKey === "number" ? "active" : ""}
            onClick={() => toggleSort("number")}
          >
            Sort: # {sortKey === "number" ? (sortDir === "asc" ? "↑" : "↓") : ""}
          </button>

          <button
            type="button"
            className={sortKey === "customer" ? "active" : ""}
            onClick={() => toggleSort("customer")}
          >
            Customer {sortKey === "customer" ? (sortDir === "asc" ? "↑" : "↓") : ""}
          </button>

          <button
            type="button"
            className={sortKey === "status" ? "active" : ""}
            onClick={() => toggleSort("status")}
          >
            Status {sortKey === "status" ? (sortDir === "asc" ? "↑" : "↓") : ""}
          </button>

          <button
            type="button"
            className={sortKey === "total" ? "active" : ""}
            onClick={() => toggleSort("total")}
          >
            Total {sortKey === "total" ? (sortDir === "asc" ? "↑" : "↓") : ""}
          </button>

          <div style={{ marginLeft: "auto", opacity: 0.7 }}>
            {filteredSorted.length} / {orders.length}
          </div>
        </div>
      </div>

      <ul className="list">
        {filteredSorted.length === 0 ? (
          <li style={{ padding: "1rem", opacity: 0.6 }}>
            No matching orders.
          </li>
        ) : (
          filteredSorted.map((order) => (
            <li
              key={order._id}
              className={order._id === selectedId ? "selected" : ""}
              onClick={() => onSelect(order._id)}
            >
              <div className="title">Order #{order.number}</div>
              <div className="subtitle">{order.customerName}</div>
              <div className={`pill status-${safeLower(order.status)}`}>
                {order.status}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

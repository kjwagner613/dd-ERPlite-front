import { useMemo, useState } from "react";

function safeLower(v) {
  return (v ?? "").toString().toLowerCase();
}

export default function PriceListList({ prices = [], selectedId, onSelect }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = safeLower(query).trim();
    if (!q) return prices;
    return prices.filter((p) =>
      [p.productId, p.validFrom, p.validTo, p.price].some((v) => safeLower(v).includes(q))
    );
  }, [prices, query]);

  return (
    <div className="list-pane">
      <div className="list-header" style={{ display: "grid", gap: 8 }}>
        <input
          className="search"
          placeholder="Search price list… (product id, date)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div style={{ marginLeft: "auto", opacity: 0.7 }}>
          {filtered.length} / {prices.length}
        </div>
      </div>

      <ul className="list">
        {filtered.length === 0 ? (
          <li style={{ padding: "1rem", opacity: 0.6 }}>No matching prices.</li>
        ) : (
          filtered.map((price) => (
            <li
              key={price._id}
              className={price._id === selectedId ? "selected" : ""}
              onClick={() => onSelect(price._id)}
            >
              <div className="title">Product {price.productId}</div>
              <div className="subtitle">${Number(price.price || 0).toFixed(2)}</div>
              <div className="pill">{price.validFrom} → {price.validTo}</div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

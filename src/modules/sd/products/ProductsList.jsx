import { useMemo, useState } from "react";

function safeLower(v) {
  return (v ?? "").toString().toLowerCase();
}

export default function ProductsList({ products = [], selectedId, onSelect }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = safeLower(query).trim();
    if (!q) return products;
    return products.filter((p) =>
      [p.productId, p.name, p.category].some((v) => safeLower(v).includes(q))
    );
  }, [products, query]);

  return (
    <div className="list-pane">
      <div className="list-header" style={{ display: "grid", gap: 8 }}>
        <input
          className="search"
          placeholder="Search products… (id, name, category)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div style={{ marginLeft: "auto", opacity: 0.7 }}>
          {filtered.length} / {products.length}
        </div>
      </div>

      <ul className="list">
        {filtered.length === 0 ? (
          <li style={{ padding: "1rem", opacity: 0.6 }}>No matching products.</li>
        ) : (
          filtered.map((product) => (
            <li
              key={product._id}
              className={product._id === selectedId ? "selected" : ""}
              onClick={() => onSelect(product._id)}
            >
              <div className="title">{product.productId} · {product.name}</div>
              <div className="subtitle">{product.category || "Uncategorized"}</div>
              <div className="pill">On Hand: {product.onHand ?? 0}</div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default function ProductsDetail({ product }) {
  return (
    <div className="detail-pane">
      <div className="detail-header">
        <h2>{product.productId} · {product.name}</h2>
        <div className="customer">{product.category || "Uncategorized"}</div>
      </div>

      <div className="tab-content">
        <table className="info-table">
          <tbody>
            <tr><th>Product ID</th><td>{product.productId}</td></tr>
            <tr><th>Name</th><td>{product.name}</td></tr>
            <tr><th>Category</th><td>{product.category || "—"}</td></tr>
            <tr><th>Modifiers</th><td>{product.modifiers?.join(", ") || "—"}</td></tr>
            <tr><th>On Hand</th><td>{product.onHand ?? 0}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function PriceListDetail({ price }) {
  return (
    <div className="detail-pane">
      <div className="detail-header">
        <h2>Product {price.productId}</h2>
        <div className="customer">Unit Price: ${Number(price.price || 0).toFixed(2)}</div>
      </div>

      <div className="tab-content">
        <table className="info-table">
          <tbody>
            <tr><th>Product ID</th><td>{price.productId}</td></tr>
            <tr><th>Price</th><td>${Number(price.price || 0).toFixed(2)}</td></tr>
            <tr><th>Valid From</th><td>{price.validFrom}</td></tr>
            <tr><th>Valid To</th><td>{price.validTo}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SalesOrderRelated({ order }) {
  return (
    <div className="section">
      <h3>Related</h3>

      <ul className="related-list">
        <li>
          <strong>Invoice:</strong>{" "}
          {order.invoiceId ? `#${order.invoiceId}` : "Not created"}
        </li>

        <li>
          <strong>Production Order:</strong>{" "}
          {order.productionOrderId ? `#${order.productionOrderId}` : "None"}
        </li>

        <li>
          <strong>Time Entries:</strong> {order.timeCount || 0}
        </li>
      </ul>
    </div>
  );
}



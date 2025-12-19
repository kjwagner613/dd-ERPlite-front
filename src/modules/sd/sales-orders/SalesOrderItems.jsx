export default function SalesOrderItems({ order }) {
  const items = Array.isArray(order?.items) ? order.items : [];
  const total = Number(order?.total) || 0;

  return (
    <div className="section">
      <h3>Items</h3>

      <table className="items-table">
        <thead>
          <tr>
            <th>Material</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>

        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", opacity: 0.7 }}>
                No items on this order.
              </td>
            </tr>
          ) : (
            items.map((item, i) => {
              const qty = Number(item?.qty) || 0;
              const price = Number(item?.price) || 0;

              return (
                <tr key={item?.id ?? `${item?.materialName ?? "item"}-${i}`}>
                  <td>{item?.materialName ?? "—"}</td>
                  <td>{qty}</td>
                  <td>${price.toFixed(2)}</td>
                  <td>${(qty * price).toFixed(2)}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <div className="totals">
        <div>Total: ${total.toFixed(2)}</div>
      </div>
    </div>
  );
}
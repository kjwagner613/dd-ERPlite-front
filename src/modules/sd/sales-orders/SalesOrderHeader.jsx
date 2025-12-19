export default function SalesOrderHeader({ order }) {
  const steps = ["QUOTE", "OPEN", "DELIVERED", "CLOSED"];

  return (
    <div className="detail-header">
      <h2>Order #{order.number}</h2>
      <div className="customer">{order.customerName}</div>

      <div className="status-bar">
        {steps.map(step => (
          <div
            key={step}
            className={`step ${step === order.status ? "active" : ""}`}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}

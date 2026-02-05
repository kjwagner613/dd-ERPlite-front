export default function SalesOrderHeader({ order }) {
  const steps = ["DRAFT", "QUOTE", "SUBMITTED", "FULFILLED"];
  const activityDates = (order?.activity || [])
    .map((a) => new Date(a.timestamp.replace(" ", "T")))
    .filter((d) => !Number.isNaN(d.getTime()));
  const lastDate = activityDates.length
    ? new Date(Math.max(...activityDates.map((d) => d.getTime())))
    : null;
  const daysSince = lastDate ? Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const isAtRisk = order?.status !== "FULFILLED" && daysSince > 3;

  return (
    <div className="detail-header">
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <h2>Order #{order.number}</h2>
        {isAtRisk && <span className="pill risk-pill">At Risk</span>}
      </div>
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

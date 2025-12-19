export default function CustomerHeader({ customer, onEdit }) {
  return (
    <div className="detail-header">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>{customer.name}</h2>

        {onEdit && (
          <button className="secondary" onClick={onEdit}>
            Edit
          </button>
        )}
      </div>

      <div className="customer-meta">
        {customer.company && <span>{customer.company}</span>}
        {customer.email && <span>{customer.email}</span>}
        {customer.phone && <span>{customer.phone}</span>}
      </div>
    </div>
  );
}

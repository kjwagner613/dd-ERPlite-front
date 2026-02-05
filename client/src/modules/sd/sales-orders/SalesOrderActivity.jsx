export default function SalesOrderActivity({ order }) {
  return (
    <div className="section">
      <h3>Activity</h3>

      {order.activity?.length ? (
        <ul className="activity-list">
          {order.activity.map((entry, i) => (
            <li key={i}>
              <div className="timestamp">{entry.timestamp}</div>
              <div className="text">{entry.text}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div style={{ opacity: 0.6 }}>No activity recorded</div>
      )}
    </div>
  );
}

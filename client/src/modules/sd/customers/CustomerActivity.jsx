export default function CustomerActivity({ customer }) {
  return (
    <div className="section">
      <h3>Activity</h3>

      {customer.activity?.length ? (
        <ul className="activity-list">
          {customer.activity.map((entry, i) => (
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

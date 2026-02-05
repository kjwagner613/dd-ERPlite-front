export default function CustomerItems({ customer }) {
  return (
    <div className="section">
      <h3>Customer Info</h3>

      <table className="info-table">
        <tbody>
          <tr><th>Name</th><td>{customer.name}</td></tr>
          <tr><th>Company</th><td>{customer.company}</td></tr>
          <tr><th>SLA (Days)</th><td>{customer.slaDays ?? 15}</td></tr>
          <tr><th>Phone</th><td>{customer.phone}</td></tr>
          <tr><th>Email</th><td>{customer.email}</td></tr>
          <tr><th>Address</th><td>{customer.address}</td></tr>
          <tr><th>City</th><td>{customer.city}</td></tr>
          <tr><th>State</th><td>{customer.state}</td></tr>
          <tr><th>Zip</th><td>{customer.zip}</td></tr>
          <tr><th>Country</th><td>{customer.country}</td></tr>
        </tbody>
      </table>
    </div>
  );
}

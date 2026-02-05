export default function CustomerRelated({ customer }) {
  return (
    <div className="section">
      <h3>Related</h3>

      <ul className="related-list">
        <li><strong>Sales Orders:</strong> {customer.salesOrderCount || 0}</li>
        <li><strong>Invoices:</strong> {customer.invoiceCount || 0}</li>
        <li><strong>Activity:</strong> {customer.activity?.length || 0}</li>
      </ul>
    </div>
  );
}
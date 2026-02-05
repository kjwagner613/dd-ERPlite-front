import { useEffect, useState } from "react";

function toIsoDate(value) {
  if (!value) return "";
  if (typeof value === "string" && value.length >= 10) return value.slice(0, 10);
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

function buildForm(initialValues = {}) {
  return {
    productId: initialValues.productId || "",
    price: initialValues.price ?? 0,
    validFrom: toIsoDate(initialValues.validFrom) || "",
    validTo: toIsoDate(initialValues.validTo) || "",
  };
}

export default function PriceListForm({ initialValues = {}, products = [], onSave, onCancel }) {
  const [form, setForm] = useState(() => buildForm(initialValues));

  useEffect(() => {
    setForm(buildForm(initialValues));
  }, [initialValues?._id]);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave?.({
      ...form,
      price: Number(form.price) || 0,
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>{initialValues?._id ? "Edit Price" : "New Price"}</h3>

      <div className="form-row">
        <label htmlFor="productId">Product</label>
        <select
          id="productId"
          value={form.productId}
          onChange={(e) => updateField("productId", e.target.value)}
        >
          <option value="">Select product</option>
          {products.map((p) => (
            <option key={p._id} value={p.productId}>
              {p.productId} · {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="price">Unit Price</label>
        <input
          id="price"
          type="number"
          step="0.01"
          min={0}
          value={form.price}
          onChange={(e) => updateField("price", e.target.value)}
        />
      </div>

      <div className="form-row">
        <label htmlFor="validFrom">Valid From</label>
        <input
          id="validFrom"
          type="date"
          value={form.validFrom}
          onChange={(e) => updateField("validFrom", e.target.value)}
        />
      </div>

      <div className="form-row">
        <label htmlFor="validTo">Valid To</label>
        <input
          id="validTo"
          type="date"
          value={form.validTo}
          onChange={(e) => updateField("validTo", e.target.value)}
        />
      </div>

      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel} className="secondary">
          Cancel
        </button>
      </div>
    </form>
  );
}

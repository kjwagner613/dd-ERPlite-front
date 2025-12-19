import { useEffect, useState } from "react";

const FIELDS = [
  { key: "name", label: "Name", type: "text", autoComplete: "name" },
  { key: "company", label: "Company", type: "text", autoComplete: "organization" },
  { key: "email", label: "Email", type: "email", autoComplete: "email" },
  { key: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { key: "address", label: "Address", type: "text", autoComplete: "street-address" },
  { key: "city", label: "City", type: "text", autoComplete: "address-level2" },
  { key: "state", label: "State", type: "text", autoComplete: "address-level1" },
  { key: "zip", label: "Zip", type: "text", autoComplete: "postal-code" },
  { key: "country", label: "Country", type: "text", autoComplete: "country-name" },
];

function buildForm(initialValues = {}) {
  const out = {};
  for (const f of FIELDS) out[f.key] = initialValues[f.key] ?? "";
  return out;
}

export default function CustomerForm({ initialValues = {}, onSave, onCancel }) {
  const [form, setForm] = useState(() => buildForm(initialValues));

  useEffect(() => {
    setForm(buildForm(initialValues));
  }, [initialValues?._id]); // or [initialValues]?

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave?.(form);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>{initialValues?._id ? "Edit Customer" : "New Customer"}</h3>

      {FIELDS.map(({ key, label, type, autoComplete }) => (
        <div className="form-row" key={key}>
          <label htmlFor={key}>{label}</label>
          <input
            id={key}
            type={type}
            autoComplete={autoComplete}
            value={form[key]}
            onChange={(e) => updateField(key, e.target.value)}
          />
        </div>
      ))}

      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel} className="secondary">
          Cancel
        </button>
      </div>
    </form>
  );
}

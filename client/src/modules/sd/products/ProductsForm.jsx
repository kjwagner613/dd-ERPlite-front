import { useEffect, useState } from "react";

const FIELDS = [
  { key: "productId", label: "Product ID", type: "text" },
  { key: "name", label: "Product", type: "text" },
  { key: "category", label: "Category", type: "text" },
  { key: "onHand", label: "On Hand", type: "number" },
];

function buildForm(initialValues = {}) {
  const out = {};
  for (const f of FIELDS) out[f.key] = initialValues[f.key] ?? (f.type === "number" ? 0 : "");
  const modifiers = Array.isArray(initialValues.modifiers) ? initialValues.modifiers.join(", ") : "";
  return { ...out, modifiers };
}

export default function ProductsForm({ initialValues = {}, onSave, onCancel }) {
  const [form, setForm] = useState(() => buildForm(initialValues));

  useEffect(() => {
    setForm(buildForm(initialValues));
  }, [initialValues?._id]);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      onHand: Number(form.onHand) || 0,
      modifiers: form.modifiers
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean),
    };
    onSave?.(payload);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>{initialValues?._id ? "Edit Product" : "New Product"}</h3>

      {FIELDS.map(({ key, label, type }) => (
        <div className="form-row" key={key}>
          <label htmlFor={key}>{label}</label>
          <input
            id={key}
            type={type}
            value={form[key]}
            onChange={(e) => updateField(key, e.target.value)}
          />
        </div>
      ))}

      <div className="form-row">
        <label htmlFor="modifiers">Modifiers</label>
        <input
          id="modifiers"
          type="text"
          value={form.modifiers}
          onChange={(e) => updateField("modifiers", e.target.value)}
          placeholder="Comma separated"
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

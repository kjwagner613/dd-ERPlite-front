import { useEffect, useMemo, useState } from "react";

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function toIsoDate(value) {
  if (!value) return "";
  if (typeof value === "string" && value.length >= 10) return value.slice(0, 10);
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

function getPriceFor(productId, orderDate, priceList) {
  if (!productId) return 0;
  const date = toIsoDate(orderDate) || todayIso();
  const match = priceList.find((p) => p.productId === productId);
  if (!match) return 0;
  const start = new Date(`${match.validFrom}T00:00:00`);
  const end = new Date(`${match.validTo}T23:59:59`);
  const current = new Date(`${date}T12:00:00`);
  if (current >= start && current <= end) return match.price;
  return match.price;
}

function buildForm(initialValues = {}, customers = []) {
  const fallbackCustomer = customers[0];
  const customerId = initialValues.customerId || fallbackCustomer?._id || "";
  const baseItems = Array.isArray(initialValues.items) ? initialValues.items : [];

  return {
    customerId,
    status: initialValues.status || "DRAFT",
    orderDate: toIsoDate(initialValues.orderDate) || todayIso(),
    softShipDate: toIsoDate(initialValues.softShipDate),
    slaDays: initialValues.slaDays ?? (fallbackCustomer?.slaDays ?? 15),
    remarks: initialValues.remarks || "",
    items: baseItems.map((item) => ({
      id: item.id || crypto.randomUUID(),
      productId: item.productId || "",
      materialName: item.materialName || "",
      qty: item.qty ?? 1,
      price: item.price ?? 0,
      remark: item.remark || "",
      inventoryVerified: item.inventoryVerified || false,
      priceOverride: item.priceOverride || false,
    })),
  };
}

export default function SalesOrderForm({
  initialValues = {},
  customers = [],
  products = [],
  priceList = [],
  onSave,
  onCancel,
}) {
  const [form, setForm] = useState(() => buildForm(initialValues, customers));

  useEffect(() => {
    setForm(buildForm(initialValues, customers));
  }, [initialValues?._id, customers]);

  const productMap = useMemo(() => {
    const map = new Map();
    products.forEach((p) => map.set(p.productId, p));
    return map;
  }, [products]);

  const selectedCustomer = customers.find((c) => c._id === form.customerId);

  const computedItems = useMemo(() => {
    return form.items.map((item) => {
      const product = productMap.get(item.productId);
      const onHand = product?.onHand ?? 0;
      const qty = Number(item.qty) || 0;
      return {
        ...item,
        materialName: product?.name || item.materialName || "",
        onHand,
        inventoryOk: qty <= onHand,
      };
    });
  }, [form.items, productMap]);

  const total = useMemo(() => {
    return computedItems.reduce((sum, item) => {
      const qty = Number(item.qty) || 0;
      const price = Number(item.price) || 0;
      return sum + qty * price;
    }, 0);
  }, [computedItems]);

  const allInventoryVerified = computedItems.length
    ? computedItems.every((item) => item.inventoryVerified && item.inventoryOk)
    : false;

  const requiresConfirmation = form.status === "SUBMITTED" || form.status === "FULFILLED";
  const canSave = !requiresConfirmation || (form.softShipDate && allInventoryVerified);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateItem(index, patch) {
    setForm((prev) => {
      const next = [...prev.items];
      next[index] = { ...next[index], ...patch };
      return { ...prev, items: next };
    });
  }

  function handleCustomerChange(id) {
    const customer = customers.find((c) => c._id === id);
    updateField("customerId", id);
    updateField("slaDays", customer?.slaDays ?? 15);
  }

  function handleProductChange(index, productId) {
    const product = productMap.get(productId);
    const nextPrice = getPriceFor(productId, form.orderDate, priceList);
    updateItem(index, {
      productId,
      materialName: product?.name || "",
      price: nextPrice,
      priceOverride: false,
      inventoryVerified: false,
    });
  }

  function handleQtyChange(index, qty) {
    updateItem(index, { qty, inventoryVerified: false });
  }

  function handlePriceChange(index, price) {
    updateItem(index, { price, priceOverride: true });
  }

  function addItem() {
    setForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: crypto.randomUUID(),
          productId: "",
          materialName: "",
          qty: 1,
          price: 0,
          remark: "",
          inventoryVerified: false,
          priceOverride: false,
        },
      ],
    }));
  }

  function removeItem(index) {
    setForm((prev) => {
      const next = [...prev.items];
      next.splice(index, 1);
      return { ...prev, items: next };
    });
  }

  function handleOrderDateChange(value) {
    updateField("orderDate", value);
    setForm((prev) => {
      const nextItems = prev.items.map((item) => {
        if (!item.productId || item.priceOverride) return item;
        return {
          ...item,
          price: getPriceFor(item.productId, value, priceList),
        };
      });
      return { ...prev, items: nextItems };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave?.({
      ...form,
      items: computedItems.map(({ onHand, inventoryOk, ...rest }) => rest),
      total,
      inventoryConfirmed: allInventoryVerified,
      customerName: selectedCustomer?.company || selectedCustomer?.name || "",
    });
  }

  return (
    <form className="form order-form" onSubmit={handleSubmit}>
      <h3>{initialValues?._id ? "Edit Sales Order" : "New Sales Order"}</h3>

      <div className="order-grid">
        <div className="form-row">
          <label htmlFor="customerId">Customer</label>
          <select
            id="customerId"
            value={form.customerId}
            onChange={(e) => handleCustomerChange(e.target.value)}
          >
            <option value="" disabled>
              Select customer
            </option>
            {customers.map((c) => (
              <option key={c._id} value={c._id}>
                {c.company || c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={form.status}
            onChange={(e) => updateField("status", e.target.value)}
          >
            <option value="DRAFT">Draft</option>
            <option value="QUOTE">Quote</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="FULFILLED">Fulfilled</option>
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="orderDate">Order Date</label>
          <input
            id="orderDate"
            type="date"
            value={form.orderDate}
            onChange={(e) => handleOrderDateChange(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="softShipDate">Soft Ship Date</label>
          <input
            id="softShipDate"
            type="date"
            value={form.softShipDate}
            onChange={(e) => updateField("softShipDate", e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="slaDays">SLA Days</label>
          <input
            id="slaDays"
            type="number"
            min={1}
            value={form.slaDays}
            onChange={(e) => updateField("slaDays", Number(e.target.value))}
          />
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="remarks">Customer Remarks</label>
        <textarea
          id="remarks"
          rows={3}
          value={form.remarks}
          onChange={(e) => updateField("remarks", e.target.value)}
        />
      </div>

      <div className="section" style={{ marginTop: "0.5rem" }}>
        <div className="section-header">
          <h3>Items</h3>
          <button type="button" onClick={addItem}>
            + Add Item
          </button>
        </div>

        <table className="items-table items-edit">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>On Hand</th>
              <th>Inventory</th>
              <th>Remark</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {computedItems.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", opacity: 0.7 }}>
                  Add items to build the order.
                </td>
              </tr>
            ) : (
              computedItems.map((item, index) => (
                <tr key={item.id}>
                  <td>
                    <select
                      value={item.productId}
                      onChange={(e) => handleProductChange(index, e.target.value)}
                    >
                      <option value="">Select product</option>
                      {products.map((p) => (
                        <option key={p.productId} value={p.productId}>
                          {p.productId} · {p.name}
                        </option>
                      ))}
                    </select>
                    {item.productId && (
                      <div className="muted small">
                        {productMap.get(item.productId)?.category}
                        {productMap.get(item.productId)?.modifiers?.length
                          ? ` · ${productMap.get(item.productId).modifiers.join(", ")}`
                          : ""}
                      </div>
                    )}
                  </td>
                  <td>
                    <input
                      type="number"
                      min={0}
                      value={item.qty}
                      onChange={(e) => handleQtyChange(index, Number(e.target.value))}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      value={item.price}
                      onChange={(e) => handlePriceChange(index, Number(e.target.value))}
                    />
                  </td>
                  <td>{item.onHand}</td>
                  <td>
                    <div className={`inventory-pill ${item.inventoryOk ? "ok" : "short"}`}>
                      {item.inventoryOk ? "Available" : "Short"}
                    </div>
                    <label className="inline-check">
                      <input
                        type="checkbox"
                        checked={item.inventoryVerified}
                        disabled={!item.inventoryOk}
                        onChange={(e) =>
                          updateItem(index, { inventoryVerified: e.target.checked })
                        }
                      />
                      Verified
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.remark}
                      onChange={(e) => updateItem(index, { remark: e.target.value })}
                      placeholder="Customer remark"
                    />
                  </td>
                  <td>
                    <button type="button" className="secondary" onClick={() => removeItem(index)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="totals">Total: ${total.toFixed(2)}</div>
      </div>

      {requiresConfirmation && (!form.softShipDate || !allInventoryVerified) && (
        <div className="alert">
          Soft ship date and inventory verification are required before submission.
        </div>
      )}

      <div className="form-actions">
        <button type="submit" disabled={!canSave}>
          Save Order
        </button>
        <button type="button" onClick={onCancel} className="secondary">
          Cancel
        </button>
      </div>
    </form>
  );
}

import { useState, useEffect } from "react";
import TwoPane from "../../../layout/TwoPane/TwoPane";
import SalesOrderList from "./SalesOrderList";
import SalesOrderDetail from "./SalesOrderDetail";
import SalesOrderForm from "./SalesOrderForm";
import {
  getSalesOrders,
  getCustomers,
  getProducts,
  getPriceList,
  createSalesOrder,
  updateSalesOrder,
} from "../../../api/sd.api";

export default function SalesOrders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [mode, setMode] = useState("view"); // view | edit | new

  useEffect(() => {
    getSalesOrders().then(setOrders);
    getCustomers().then(setCustomers);
    getProducts().then(setProducts);
    getPriceList().then(setPriceList);
  }, []);

  const selectedOrder = orders.find(o => o._id === selectedId) || null;

  function startNew() {
    setSelectedId(null);
    setMode("new");
  }

  function startEdit() {
    if (!selectedOrder) return;
    setMode("edit");
  }

  function cancelForm() {
    setMode("view");
  }

  function getNextOrderNumber() {
    const max = orders.reduce((acc, o) => Math.max(acc, Number(o.number) || 0), 1000);
    return max + 1;
  }

  function getNextInvoiceId() {
    const max = orders.reduce((acc, o) => Math.max(acc, Number(o.invoiceId) || 0), 800);
    return max + 1;
  }

  function buildActivity(status) {
    const now = new Date();
    const stamp = now.toISOString().slice(0, 16).replace("T", " ");
    const label = status?.toString().toLowerCase() || "updated";
    return { timestamp: stamp, text: `Order ${label}.` };
  }

  async function saveOrder(payload) {
    const nextInvoiceId = getNextInvoiceId();
    const requiresInvoice =
      (payload.status === "SUBMITTED" || payload.status === "FULFILLED") && !payload.invoiceId;

    const orderBase = {
      ...payload,
      total: payload.total ?? 0,
      invoiceId: requiresInvoice ? nextInvoiceId : payload.invoiceId ?? null,
      activity: [buildActivity(payload.status), ...(payload.activity || [])],
    };

    if (mode === "new") {
      const temp = {
        ...orderBase,
        number: getNextOrderNumber(),
      };
      const created = await createSalesOrder(temp);
      setOrders((prev) => [created, ...prev]);
      setSelectedId(created._id);
    } else {
      const updated = await updateSalesOrder(selectedId, { ...selectedOrder, ...orderBase });
      setOrders((prev) => prev.map((o) => (o._id === selectedId ? updated : o)));
    }
    setMode("view");
  }

  return (
    <TwoPane
      list={
        <div>
          <div style={{ padding: "0.75rem", display: "flex", gap: 8 }}>
            <button onClick={startNew}>+ New Sales Order</button>
            <button onClick={startEdit} disabled={!selectedOrder}>
              Edit
            </button>
          </div>

          <SalesOrderList
            orders={orders}
            selectedId={selectedId}
            onSelect={(id) => {
              setSelectedId(id);
              setMode("view");
            }}
          />
        </div>
      }
      detail={
        mode === "new" ? (
          <SalesOrderForm
            initialValues={{}}
            customers={customers}
            products={products}
            priceList={priceList}
            onSave={saveOrder}
            onCancel={cancelForm}
          />
        ) : mode === "edit" && selectedOrder ? (
          <SalesOrderForm
            initialValues={selectedOrder}
            customers={customers}
            products={products}
            priceList={priceList}
            onSave={saveOrder}
            onCancel={cancelForm}
          />
        ) : selectedOrder ? (
          <SalesOrderDetail order={selectedOrder} />
        ) : (
          <div style={{ padding: "2rem", opacity: 0.6 }}>
            Select a sales order to view details
          </div>
        )
      }
    />
  );
}

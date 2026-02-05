import { useState, useEffect } from "react";
import TwoPane from "../../../layout/TwoPane/TwoPane";
import CustomerList from "./CustomerList";
import CustomerDetail from "./CustomerDetail";
import CustomerForm from "./CustomerForm";
import { getCustomers, createCustomer, updateCustomer } from "../../../api/sd.api";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [mode, setMode] = useState("view"); // view | edit | new

  useEffect(() => {
    getCustomers().then(setCustomers);
  }, []);

  const selectedCustomer = customers.find(c => c._id === selectedId) || null;

  function startNew() {
    setSelectedId(null);
    setMode("new");
  }

  function startEdit() {
    if (!selectedCustomer) return;
    setMode("edit");
  }

  function cancelForm() {
    setMode("view");
  }

  async function saveCustomer(payload) {
    if (mode === "new") {
      const created = await createCustomer(payload);
      setCustomers(prev => [created, ...prev]);
      setSelectedId(created._id);
    } else {
      const updated = await updateCustomer(selectedId, { ...selectedCustomer, ...payload });
      setCustomers(prev =>
        prev.map(c => (c._id === selectedId ? updated : c))
      );
    }
    setMode("view");
  }

  return (
    <TwoPane
      list={
        <div>
          <div style={{ padding: "0.75rem", display: "flex", gap: 8 }}>
            <button onClick={startNew}>+ New Customer</button>
            <button onClick={startEdit} disabled={!selectedCustomer}>
              Edit
            </button>
          </div>

          <CustomerList
            customers={customers}
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
          <CustomerForm initialValues={{}} onSave={saveCustomer} onCancel={cancelForm} />
        ) : mode === "edit" && selectedCustomer ? (
          <CustomerForm initialValues={selectedCustomer} onSave={saveCustomer} onCancel={cancelForm} />
        ) : selectedCustomer ? (
          <CustomerDetail customer={selectedCustomer}
           onEdit={() => setMode("edit")} />
        ) : (
          <div style={{ padding: "2rem", opacity: 0.6 }}>
            Select a customer to view details
          </div>
        )
      }
    />
  );
}

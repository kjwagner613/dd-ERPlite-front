import { useState } from "react";
import Customers from "../modules/sd/customers";
import SalesOrders from "../modules/sd/sales-orders";

const modules = [
  {
    id: "sd",
    label: "SD",
    name: "Sales & Distribution",
    description: "Customers, Sales Orders",
    status: "Ready",
  },
  {
    id: "mm",
    label: "MM",
    name: "Materials Management",
    description: "Materials, Stock",
    status: "Coming Soon",
  },
  {
    id: "fi",
    label: "FI",
    name: "Financial Accounting",
    description: "Invoices, Ledger",
    status: "Coming Soon",
  },
  {
    id: "pp",
    label: "PP",
    name: "Production Planning",
    description: "Production Orders",
    status: "Coming Soon",
  },
  {
    id: "hr",
    label: "HR",
    name: "Human Resources",
    description: "Employees, Time",
    status: "Coming Soon",
  },
];

export default function App() {
  const [activeModule, setActiveModule] = useState("sd");
  const [sdSection, setSdSection] = useState("customers");

  const activeMeta = modules.find((mod) => mod.id === activeModule) || modules[0];

  function renderModule() {
    if (activeModule === "sd") {
      return (
        <section className="module">
          <div className="module-header">
            <div>
              <div className="eyebrow">Sales & Distribution</div>
              <h2>SD Module</h2>
              <p className="subtle">
                Customer records and sales orders in a two-pane workspace.
              </p>
            </div>
            <div className="segmented">
              <button
                type="button"
                className={sdSection === "customers" ? "active" : ""}
                onClick={() => setSdSection("customers")}
              >
                Customers
              </button>
              <button
                type="button"
                className={sdSection === "sales" ? "active" : ""}
                onClick={() => setSdSection("sales")}
              >
                Sales Orders
              </button>
            </div>
          </div>
          <div className="module-body">
            {sdSection === "customers" ? <Customers /> : <SalesOrders />}
          </div>
        </section>
      );
    }

    return (
      <section className="module placeholder">
        <div className="module-header">
          <div>
            <div className="eyebrow">{activeMeta.label}</div>
            <h2>{activeMeta.name}</h2>
            <p className="subtle">{activeMeta.description}</p>
          </div>
          <span className="status-pill">{activeMeta.status}</span>
        </div>
        <div className="module-body empty">
          <div>
            <h3>Module not connected yet</h3>
            <p>
              This space is reserved for the {activeMeta.name} workflows. Connect
              the screens when they are ready.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="app-shell">
      <aside className="menu">
        <div className="menu-header">
          <div className="brand">DD ERPlite</div>
          <p className="subtle">Main menu</p>
        </div>
        <nav className="menu-list">
          {modules.map((mod) => (
            <button
              key={mod.id}
              type="button"
              className={activeModule === mod.id ? "active" : ""}
              onClick={() => setActiveModule(mod.id)}
            >
              <span className="menu-title">{mod.name}</span>
              <span className="menu-meta">
                {mod.label} · {mod.status}
              </span>
            </button>
          ))}
        </nav>
      </aside>
      <main className="content">{renderModule()}</main>
    </div>
  );
}

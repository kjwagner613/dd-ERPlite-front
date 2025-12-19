// src/modules/sd/customers/CustomerDetail.jsx
import { useState } from "react";
import CustomerHeader from "./CustomerHeader";
import CustomerItems from "./CustomerItems";
import CustomerRelated from "./CustomerRelated";
import CustomerActivity from "./CustomerActivity";

export default function CustomerDetail({ customer, onEdit }) {
  const [tab, setTab] = useState("overview");

  return (
    <div className="detail-pane">
      <CustomerHeader customer={customer} onEdit={onEdit} />

      <div className="tabs">
        <button
          onClick={() => setTab("overview")}
          className={tab === "overview" ? "active" : ""}
        >
          Overview
        </button>
        <button
          onClick={() => setTab("related")}
          className={tab === "related" ? "active" : ""}
        >
          Related
        </button>
        <button
          onClick={() => setTab("activity")}
          className={tab === "activity" ? "active" : ""}
        >
          Activity
        </button>
      </div>

      <div className="tab-content">
        {tab === "overview" && <CustomerItems customer={customer} />}
        {tab === "related" && <CustomerRelated customer={customer} />}
        {tab === "activity" && <CustomerActivity customer={customer} />}
      </div>
    </div>
  );
}

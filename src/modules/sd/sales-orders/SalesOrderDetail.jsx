import { useState } from "react";
import SalesOrderHeader from "./SalesOrderHeader";
import SalesOrderItems from "./SalesOrderItems";
import SalesOrderRelated from "./SalesOrderRelated";
import SalesOrderActivity from "./SalesOrderActivity";

export default function SalesOrderDetail({ order }) {
  const [tab, setTab] = useState("overview");

  return (
    <div className="detail-pane">
      <SalesOrderHeader order={order} />

      <div className="tabs">
        <button onClick={() => setTab("overview")} className={tab === "overview" ? "active" : ""}>Overview</button>
        <button onClick={() => setTab("related")} className={tab === "related" ? "active" : ""}>Related</button>
        <button onClick={() => setTab("activity")} className={tab === "activity" ? "active" : ""}>Activity</button>
      </div>

      <div className="tab-content">
        {tab === "overview" && <SalesOrderItems order={order} />}
        {tab === "related" && <SalesOrderRelated order={order} />}
        {tab === "activity" && <SalesOrderActivity order={order} />}
      </div>
    </div>
  );
}

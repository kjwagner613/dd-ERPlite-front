import { useState, useEffect } from "react";
import TwoPane from "../../../layout/TwoPane/TwoPane";
import SalesOrderList from "./SalesOrderList";
import SalesOrderDetail from "./SalesOrderDetail";
import { getSalesOrders } from "../../../api/sd.api";

export default function SalesOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    getSalesOrders().then(setOrders);
  }, []);

  const selectedOrder = orders.find(o => o._id === selectedId) || null;

  return (
    <TwoPane
      list={
        <SalesOrderList
          orders={orders}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      }
      detail={
        selectedOrder ? (
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

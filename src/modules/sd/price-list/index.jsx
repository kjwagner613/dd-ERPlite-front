import { useEffect, useState } from "react";
import TwoPane from "../../../layout/TwoPane/TwoPane";
import PriceListList from "./PriceListList";
import PriceListDetail from "./PriceListDetail";
import PriceListForm from "./PriceListForm";
import {
  getPriceList,
  getProducts,
  createPrice,
  updatePrice,
  deletePrice,
} from "../../../api/sd.api";

export default function PriceList() {
  const [prices, setPrices] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [mode, setMode] = useState("view"); // view | edit | new

  useEffect(() => {
    getPriceList().then(setPrices);
    getProducts().then(setProducts);
  }, []);

  const selectedPrice = prices.find((p) => p._id === selectedId) || null;

  function startNew() {
    setSelectedId(null);
    setMode("new");
  }

  function startEdit() {
    if (!selectedPrice) return;
    setMode("edit");
  }

  function cancelForm() {
    setMode("view");
  }

  async function savePrice(payload) {
    if (mode === "new") {
      const created = await createPrice(payload);
      setPrices((prev) => [created, ...prev]);
      setSelectedId(created._id);
    } else {
      const updated = await updatePrice(selectedId, { ...selectedPrice, ...payload });
      setPrices((prev) => prev.map((p) => (p._id === selectedId ? updated : p)));
    }
    setMode("view");
  }

  async function removePrice() {
    if (!selectedPrice) return;
    await deletePrice(selectedId);
    setPrices((prev) => prev.filter((p) => p._id !== selectedId));
    setSelectedId(null);
    setMode("view");
  }

  return (
    <TwoPane
      list={
        <div>
          <div style={{ padding: "0.75rem", display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={startNew}>+ New Price</button>
            <button onClick={startEdit} disabled={!selectedPrice}>
              Edit
            </button>
            <button onClick={removePrice} disabled={!selectedPrice} className="secondary">
              Delete
            </button>
          </div>

          <PriceListList
            prices={prices}
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
          <PriceListForm
            initialValues={{}}
            products={products}
            onSave={savePrice}
            onCancel={cancelForm}
          />
        ) : mode === "edit" && selectedPrice ? (
          <PriceListForm
            initialValues={selectedPrice}
            products={products}
            onSave={savePrice}
            onCancel={cancelForm}
          />
        ) : selectedPrice ? (
          <PriceListDetail price={selectedPrice} />
        ) : (
          <div style={{ padding: "2rem", opacity: 0.6 }}>
            Select a price to view details
          </div>
        )
      }
    />
  );
}

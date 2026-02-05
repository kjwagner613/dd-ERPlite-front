import { useEffect, useState } from "react";
import TwoPane from "../../../layout/TwoPane/TwoPane";
import ProductsList from "./ProductsList";
import ProductsDetail from "./ProductsDetail";
import ProductsForm from "./ProductsForm";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../api/sd.api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [mode, setMode] = useState("view"); // view | edit | new

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const selectedProduct = products.find((p) => p._id === selectedId) || null;

  function startNew() {
    setSelectedId(null);
    setMode("new");
  }

  function startEdit() {
    if (!selectedProduct) return;
    setMode("edit");
  }

  function cancelForm() {
    setMode("view");
  }

  async function saveProduct(payload) {
    if (mode === "new") {
      const created = await createProduct(payload);
      setProducts((prev) => [created, ...prev]);
      setSelectedId(created._id);
    } else {
      const updated = await updateProduct(selectedId, { ...selectedProduct, ...payload });
      setProducts((prev) => prev.map((p) => (p._id === selectedId ? updated : p)));
    }
    setMode("view");
  }

  async function removeProduct() {
    if (!selectedProduct) return;
    await deleteProduct(selectedId);
    setProducts((prev) => prev.filter((p) => p._id !== selectedId));
    setSelectedId(null);
    setMode("view");
  }

  return (
    <TwoPane
      list={
        <div>
          <div style={{ padding: "0.75rem", display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={startNew}>+ New Product</button>
            <button onClick={startEdit} disabled={!selectedProduct}>
              Edit
            </button>
            <button onClick={removeProduct} disabled={!selectedProduct} className="secondary">
              Delete
            </button>
          </div>
          <ProductsList
            products={products}
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
          <ProductsForm initialValues={{}} onSave={saveProduct} onCancel={cancelForm} />
        ) : mode === "edit" && selectedProduct ? (
          <ProductsForm initialValues={selectedProduct} onSave={saveProduct} onCancel={cancelForm} />
        ) : selectedProduct ? (
          <ProductsDetail product={selectedProduct} />
        ) : (
          <div style={{ padding: "2rem", opacity: 0.6 }}>
            Select a product to view details
          </div>
        )
      }
    />
  );
}

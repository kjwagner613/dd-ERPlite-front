import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: new URL("./.env", import.meta.url).pathname });

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI. Set it in server/.env");
  process.exit(1);
}

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const customerSchema = new mongoose.Schema(
  {
    name: String,
    company: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    slaDays: { type: Number, default: 15 },
    salesOrderCount: { type: Number, default: 0 },
    invoiceCount: { type: Number, default: 0 },
    activity: [{ timestamp: String, text: String }],
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, unique: true },
    name: String,
    category: String,
    modifiers: [String],
    onHand: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const priceSchema = new mongoose.Schema(
  {
    productId: { type: String, index: true },
    price: Number,
    validFrom: String,
    validTo: String,
  },
  { timestamps: true }
);

const salesOrderSchema = new mongoose.Schema(
  {
    number: Number,
    customerId: String,
    customerName: String,
    status: String,
    orderDate: String,
    softShipDate: String,
    slaDays: { type: Number, default: 15 },
    remarks: String,
    inventoryConfirmed: { type: Boolean, default: false },
    total: { type: Number, default: 0 },
    items: [
      {
        id: String,
        productId: String,
        materialName: String,
        qty: Number,
        price: Number,
        remark: String,
        inventoryVerified: Boolean,
        priceOverride: Boolean,
      },
    ],
    invoiceId: Number,
    productionOrderId: Number,
    timeCount: Number,
    activity: [{ timestamp: String, text: String }],
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);
const Product = mongoose.model("Product", productSchema);
const Price = mongoose.model("Price", priceSchema);
const SalesOrder = mongoose.model("SalesOrder", salesOrderSchema);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Mongo connection error", err);
    process.exit(1);
  });

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.get("/api/customers", async (_req, res) => {
  const items = await Customer.find().sort({ updatedAt: -1 });
  res.json(items);
});

app.post("/api/customers", async (req, res) => {
  if (req.body && req.body._id) delete req.body._id;
  const item = await Customer.create(req.body);
  res.status(201).json(item);
});

app.put("/api/customers/:id", async (req, res) => {
  const item = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

app.get("/api/products", async (_req, res) => {
  const items = await Product.find().sort({ productId: 1 });
  res.json(items);
});

app.post("/api/products", async (req, res) => {
  if (req.body && req.body._id) delete req.body._id;
  const item = await Product.create(req.body);
  res.status(201).json(item);
});

app.put("/api/products/:id", async (req, res) => {
  const item = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

app.get("/api/prices", async (_req, res) => {
  const items = await Price.find().sort({ productId: 1 });
  res.json(items);
});

app.post("/api/prices", async (req, res) => {
  if (req.body && req.body._id) delete req.body._id;
  const item = await Price.create(req.body);
  res.status(201).json(item);
});

app.put("/api/prices/:id", async (req, res) => {
  const item = await Price.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

app.delete("/api/prices/:id", async (req, res) => {
  await Price.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

app.get("/api/sales-orders", async (_req, res) => {
  const items = await SalesOrder.find().sort({ updatedAt: -1 });
  res.json(items);
});

app.post("/api/sales-orders", async (req, res) => {
  if (req.body && req.body._id) delete req.body._id;
  const item = await SalesOrder.create(req.body);
  res.status(201).json(item);
});

app.put("/api/sales-orders/:id", async (req, res) => {
  const item = await SalesOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: new URL("./.env", import.meta.url).pathname });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI. Set it in server/.env");
  process.exit(1);
}

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

const customers = [
  {
    name: "Olivia Chen",
    company: "Northwind Outfitters",
    email: "olivia.chen@northwind.example",
    phone: "555-0142",
    address: "120 Harbor Blvd",
    city: "Portland",
    state: "OR",
    zip: "97205",
    country: "USA",
    slaDays: 15,
    salesOrderCount: 6,
    invoiceCount: 4,
    activity: [
      { timestamp: "2026-02-02 09:12", text: "Requested updated pricing for Q1." },
      { timestamp: "2026-01-30 15:45", text: "Closed order #1024." },
    ],
  },
  {
    name: "Marcus Hale",
    company: "Summit Ridge Co.",
    email: "mhale@summitridge.example",
    phone: "555-0188",
    address: "455 Aspen Way",
    city: "Boulder",
    state: "CO",
    zip: "80301",
    country: "USA",
    slaDays: 15,
    salesOrderCount: 3,
    invoiceCount: 2,
    activity: [
      { timestamp: "2026-02-01 11:30", text: "Signed off on quote #Q-331." },
      { timestamp: "2026-01-28 10:05", text: "Added new delivery location." },
    ],
  },
  {
    name: "Priya Natarajan",
    company: "Eastwood Labs",
    email: "priya.n@eastwood.example",
    phone: "555-0174",
    address: "88 Meridian Ave",
    city: "Austin",
    state: "TX",
    zip: "73301",
    country: "USA",
    slaDays: 12,
    salesOrderCount: 8,
    invoiceCount: 7,
    activity: [
      { timestamp: "2026-02-03 08:20", text: "Requested expedited shipment." },
      { timestamp: "2026-01-29 16:00", text: "Approved invoice #INV-845." },
      { timestamp: "2026-01-20 13:40", text: "Updated billing contact." },
    ],
  },
  {
    name: "Diego Alvarez",
    company: "Redwood Industrial",
    email: "dalvarez@redwood.example",
    phone: "555-0133",
    address: "902 Steel Park",
    city: "Phoenix",
    state: "AZ",
    zip: "85004",
    country: "USA",
    slaDays: 15,
    salesOrderCount: 1,
    invoiceCount: 0,
    activity: [{ timestamp: "2026-02-02 14:10", text: "Requested product samples." }],
  },
  {
    name: "Hannah Lee",
    company: "Bluewater Foods",
    email: "hlee@bluewater.example",
    phone: "555-0199",
    address: "77 Pier Lane",
    city: "Seattle",
    state: "WA",
    zip: "98101",
    country: "USA",
    slaDays: 20,
    salesOrderCount: 4,
    invoiceCount: 3,
    activity: [
      { timestamp: "2026-02-01 12:05", text: "Order #1031 delivered." },
      { timestamp: "2026-01-25 09:50", text: "Requested PO update." },
    ],
  },
];

const products = [
  {
    productId: "00001",
    name: "Travel Bag",
    category: "Luggage",
    modifiers: ["saint logo", "Shoulder Strap", "Canvas"],
    onHand: 120,
  },
  {
    productId: "00002",
    name: "Coffee Mug",
    category: "Ceramics",
    modifiers: ["Thermal"],
    onHand: 280,
  },
  {
    productId: "00003",
    name: "Coffee Mug",
    category: "Ceramics",
    modifiers: ["Saying"],
    onHand: 160,
  },
  {
    productId: "00004",
    name: "Coffee Mug",
    category: "Ceramics",
    modifiers: ["Logo"],
    onHand: 90,
  },
  {
    productId: "00005",
    name: "Luggage Cart",
    category: "Hardware",
    modifiers: ["Steel"],
    onHand: 24,
  },
  {
    productId: "00006",
    name: "Luggage Cart",
    category: "Hardware",
    modifiers: ["Plastic"],
    onHand: 40,
  },
];

const priceList = [
  { productId: "00001", price: 22.0, validFrom: "2026-01-01", validTo: "2026-12-31" },
  { productId: "00002", price: 18.0, validFrom: "2026-01-01", validTo: "2026-12-31" },
  { productId: "00003", price: 15.0, validFrom: "2026-01-01", validTo: "2026-12-31" },
  { productId: "00004", price: 55.0, validFrom: "2026-01-01", validTo: "2026-12-31" },
  { productId: "00005", price: 45.0, validFrom: "2026-01-01", validTo: "2026-12-31" },
  { productId: "00006", price: 235.0, validFrom: "2026-01-01", validTo: "2026-12-31" },
];

const salesOrders = [
  {
    number: 1024,
    customerName: "Northwind Outfitters",
    status: "FULFILLED",
    orderDate: "2026-01-30",
    softShipDate: "2026-02-03",
    slaDays: 15,
    remarks: "Delivered to main warehouse dock 3.",
    inventoryConfirmed: true,
    total: 1240,
    items: [
      { id: "itm-1", productId: "00001", materialName: "Travel Bag", qty: 40, price: 22, remark: "Saint logo placement", inventoryVerified: true },
      { id: "itm-2", productId: "00002", materialName: "Coffee Mug", qty: 20, price: 18, remark: "Thermal finish", inventoryVerified: true },
    ],
    invoiceId: 845,
    productionOrderId: 2203,
    timeCount: 6,
    activity: [
      { timestamp: "2026-02-02 15:45", text: "Delivered to main warehouse." },
      { timestamp: "2026-01-31 09:20", text: "QA sign-off completed." },
    ],
  },
  {
    number: 1027,
    customerName: "Summit Ridge Co.",
    status: "SUBMITTED",
    orderDate: "2026-02-01",
    softShipDate: "2026-02-08",
    slaDays: 15,
    remarks: "Customer requested staged delivery.",
    inventoryConfirmed: true,
    total: 2250,
    items: [
      { id: "itm-3", productId: "00003", materialName: "Coffee Mug", qty: 60, price: 15, remark: "Saying: Summit Strong", inventoryVerified: true },
      { id: "itm-4", productId: "00005", materialName: "Luggage Cart", qty: 30, price: 45, remark: "Steel frame", inventoryVerified: true },
    ],
    invoiceId: null,
    productionOrderId: 2211,
    timeCount: 2,
    activity: [
      { timestamp: "2026-02-02 11:30", text: "Sales order released to production." },
    ],
  },
  {
    number: 1031,
    customerName: "Bluewater Foods",
    status: "FULFILLED",
    orderDate: "2026-01-25",
    softShipDate: "2026-01-31",
    slaDays: 20,
    remarks: "Delivered early per customer request.",
    inventoryConfirmed: true,
    total: 930,
    items: [
      { id: "itm-5", productId: "00004", materialName: "Coffee Mug", qty: 12, price: 55, remark: "Logo imprint", inventoryVerified: true },
      { id: "itm-6", productId: "00002", materialName: "Coffee Mug", qty: 15, price: 18, remark: "Thermal lid", inventoryVerified: true },
    ],
    invoiceId: 861,
    productionOrderId: null,
    timeCount: 4,
    activity: [{ timestamp: "2026-02-01 12:05", text: "Invoice paid." }],
  },
  {
    number: 1033,
    customerName: "Eastwood Labs",
    status: "QUOTE",
    orderDate: "2026-02-02",
    softShipDate: "",
    slaDays: 12,
    remarks: "Awaiting approval from procurement.",
    inventoryConfirmed: false,
    total: 2100,
    items: [
      { id: "itm-7", productId: "00001", materialName: "Travel Bag", qty: 10, price: 22, remark: "Standard logo", inventoryVerified: false },
      { id: "itm-8", productId: "00006", materialName: "Luggage Cart", qty: 8, price: 235, remark: "Plastic wheels", inventoryVerified: false },
    ],
    invoiceId: null,
    productionOrderId: null,
    timeCount: 0,
    activity: [{ timestamp: "2026-02-03 08:20", text: "Quote sent to customer." }],
  },
  {
    number: 1035,
    customerName: "Redwood Industrial",
    status: "DRAFT",
    orderDate: "2026-02-04",
    softShipDate: "",
    slaDays: 15,
    remarks: "",
    inventoryConfirmed: false,
    total: 0,
    items: [],
    invoiceId: null,
    productionOrderId: null,
    timeCount: 0,
    activity: [{ timestamp: "2026-02-04 10:15", text: "Draft created for review." }],
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);

  await Promise.all([
    Customer.deleteMany({}),
    Product.deleteMany({}),
    Price.deleteMany({}),
    SalesOrder.deleteMany({}),
  ]);

  const createdCustomers = await Customer.insertMany(customers);
  await Product.insertMany(products);
  await Price.insertMany(priceList);

  const customerByCompany = new Map(
    createdCustomers.map((c) => [c.company, c._id.toString()])
  );

  const ordersWithCustomerIds = salesOrders.map((order) => ({
    ...order,
    customerId: customerByCompany.get(order.customerName) || "",
  }));

  await SalesOrder.insertMany(ordersWithCustomerIds);

  console.log("Seed complete");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

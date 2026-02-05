const customers = [
  {
    _id: "cust-1001",
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
    _id: "cust-1002",
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
    _id: "cust-1003",
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
    _id: "cust-1004",
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
    _id: "cust-1005",
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
    _id: "so-1024",
    number: 1024,
    orderDate: "2026-01-30",
    customerId: "cust-1001",
    customerName: "Northwind Outfitters",
    status: "FULFILLED",
    total: 1240,
    items: [
      { id: "itm-1", productId: "00001", materialName: "Travel Bag", qty: 40, price: 22, remark: "Saint logo placement" },
      { id: "itm-2", productId: "00002", materialName: "Coffee Mug", qty: 20, price: 18, remark: "Thermal finish" },
    ],
    remarks: "Delivered to main warehouse dock 3.",
    softShipDate: "2026-02-03",
    slaDays: 15,
    inventoryConfirmed: true,
    invoiceId: 845,
    productionOrderId: 2203,
    timeCount: 6,
    activity: [
      { timestamp: "2026-02-02 15:45", text: "Delivered to main warehouse." },
      { timestamp: "2026-01-31 09:20", text: "QA sign-off completed." },
    ],
  },
  {
    _id: "so-1027",
    number: 1027,
    orderDate: "2026-02-01",
    customerId: "cust-1002",
    customerName: "Summit Ridge Co.",
    status: "SUBMITTED",
    total: 2250,
    items: [
      { id: "itm-3", productId: "00003", materialName: "Coffee Mug", qty: 60, price: 15, remark: "Saying: Summit Strong" },
      { id: "itm-4", productId: "00005", materialName: "Luggage Cart", qty: 30, price: 45, remark: "Steel frame" },
    ],
    remarks: "Customer requested staged delivery.",
    softShipDate: "2026-02-08",
    slaDays: 15,
    inventoryConfirmed: true,
    invoiceId: null,
    productionOrderId: 2211,
    timeCount: 2,
    activity: [
      { timestamp: "2026-02-02 11:30", text: "Sales order released to production." },
    ],
  },
  {
    _id: "so-1031",
    number: 1031,
    orderDate: "2026-01-25",
    customerId: "cust-1005",
    customerName: "Bluewater Foods",
    status: "FULFILLED",
    total: 930,
    items: [
      { id: "itm-5", productId: "00004", materialName: "Coffee Mug", qty: 12, price: 55, remark: "Logo imprint" },
      { id: "itm-6", productId: "00002", materialName: "Coffee Mug", qty: 15, price: 18, remark: "Thermal lid" },
    ],
    remarks: "Delivered early per customer request.",
    softShipDate: "2026-01-31",
    slaDays: 20,
    inventoryConfirmed: true,
    invoiceId: 861,
    productionOrderId: null,
    timeCount: 4,
    activity: [
      { timestamp: "2026-02-01 12:05", text: "Invoice paid." },
    ],
  },
  {
    _id: "so-1033",
    number: 1033,
    orderDate: "2026-02-02",
    customerId: "cust-1003",
    customerName: "Eastwood Labs",
    status: "QUOTE",
    total: 2100,
    items: [
      { id: "itm-7", productId: "00001", materialName: "Travel Bag", qty: 10, price: 22, remark: "Standard logo" },
      { id: "itm-8", productId: "00006", materialName: "Luggage Cart", qty: 8, price: 235, remark: "Plastic wheels" },
    ],
    remarks: "Awaiting approval from procurement.",
    softShipDate: "",
    slaDays: 12,
    inventoryConfirmed: false,
    invoiceId: null,
    productionOrderId: null,
    timeCount: 0,
    activity: [
      { timestamp: "2026-02-03 08:20", text: "Quote sent to customer." },
    ],
  },
  {
    _id: "so-1035",
    number: 1035,
    orderDate: "2026-02-04",
    customerId: "cust-1004",
    customerName: "Redwood Industrial",
    status: "DRAFT",
    total: 0,
    items: [],
    remarks: "",
    softShipDate: "",
    slaDays: 15,
    inventoryConfirmed: false,
    invoiceId: null,
    productionOrderId: null,
    timeCount: 0,
    activity: [
      { timestamp: "2026-02-04 10:15", text: "Draft created for review." },
    ],
  },
];

const USE_API = true;
const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

function buildUrl(path) {
  if (/^https?:\/\//i.test(path)) return path;
  if (!API_BASE) return path;
  return `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

async function fetchJson(url, options) {
  const res = await fetch(buildUrl(url), options);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export function getCustomers() {
  if (!USE_API) return Promise.resolve(customers);
  return fetchJson("/api/customers");
}

export function getSalesOrders() {
  if (!USE_API) return Promise.resolve(salesOrders);
  return fetchJson("/api/sales-orders");
}

export function getProducts() {
  if (!USE_API) return Promise.resolve(products);
  return fetchJson("/api/products");
}

export function getPriceList() {
  if (!USE_API) return Promise.resolve(priceList);
  return fetchJson("/api/prices");
}

export function createSalesOrder(payload) {
  return fetchJson("/api/sales-orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function updateSalesOrder(id, payload) {
  return fetchJson(`/api/sales-orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function createCustomer(payload) {
  return fetchJson("/api/customers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function updateCustomer(id, payload) {
  return fetchJson(`/api/customers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function createProduct(payload) {
  return fetchJson("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function updateProduct(id, payload) {
  return fetchJson(`/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function deleteProduct(id) {
  return fetchJson(`/api/products/${id}`, { method: "DELETE" });
}

export function createPrice(payload) {
  return fetchJson("/api/prices", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function updatePrice(id, payload) {
  return fetchJson(`/api/prices/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function deletePrice(id) {
  return fetchJson(`/api/prices/${id}`, { method: "DELETE" });
}

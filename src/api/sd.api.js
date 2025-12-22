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
    salesOrderCount: 6,
    invoiceCount: 4,
    activity: [
      { timestamp: "2024-12-18 09:12", text: "Requested updated pricing for Q1." },
      { timestamp: "2024-12-10 15:45", text: "Closed order #1024." },
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
    salesOrderCount: 3,
    invoiceCount: 2,
    activity: [
      { timestamp: "2024-12-20 11:30", text: "Signed off on quote #Q-331." },
      { timestamp: "2024-12-05 10:05", text: "Added new delivery location." },
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
    salesOrderCount: 8,
    invoiceCount: 7,
    activity: [
      { timestamp: "2024-12-22 08:20", text: "Requested expedited shipment." },
      { timestamp: "2024-12-14 16:00", text: "Approved invoice #INV-845." },
      { timestamp: "2024-12-01 13:40", text: "Updated billing contact." },
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
    salesOrderCount: 1,
    invoiceCount: 0,
    activity: [{ timestamp: "2024-12-21 14:10", text: "Requested product samples." }],
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
    salesOrderCount: 4,
    invoiceCount: 3,
    activity: [
      { timestamp: "2024-12-19 12:05", text: "Order #1031 delivered." },
      { timestamp: "2024-12-07 09:50", text: "Requested PO update." },
    ],
  },
];

const salesOrders = [
  {
    _id: "so-1024",
    number: 1024,
    customerName: "Northwind Outfitters",
    status: "DELIVERED",
    total: 2840,
    items: [
      { id: "itm-1", materialName: "Alpine Jacket", qty: 40, price: 45 },
      { id: "itm-2", materialName: "Trail Pack 35L", qty: 20, price: 62 },
    ],
    invoiceId: 845,
    productionOrderId: 2203,
    timeCount: 6,
    activity: [
      { timestamp: "2024-12-10 15:45", text: "Delivered to main warehouse." },
      { timestamp: "2024-12-08 09:20", text: "QA sign-off completed." },
    ],
  },
  {
    _id: "so-1027",
    number: 1027,
    customerName: "Summit Ridge Co.",
    status: "OPEN",
    total: 1560,
    items: [
      { id: "itm-3", materialName: "Summit Gloves", qty: 60, price: 18 },
      { id: "itm-4", materialName: "Peak Thermals", qty: 30, price: 30 },
    ],
    invoiceId: null,
    productionOrderId: 2211,
    timeCount: 2,
    activity: [
      { timestamp: "2024-12-20 11:30", text: "Sales order released to production." },
    ],
  },
  {
    _id: "so-1031",
    number: 1031,
    customerName: "Bluewater Foods",
    status: "CLOSED",
    total: 990,
    items: [
      { id: "itm-5", materialName: "Chill Wrap", qty: 30, price: 20 },
      { id: "itm-6", materialName: "Insulated Tote", qty: 15, price: 26 },
    ],
    invoiceId: 861,
    productionOrderId: null,
    timeCount: 4,
    activity: [
      { timestamp: "2024-12-19 12:05", text: "Invoice paid." },
    ],
  },
  {
    _id: "so-1033",
    number: 1033,
    customerName: "Eastwood Labs",
    status: "QUOTE",
    total: 2100,
    items: [
      { id: "itm-7", materialName: "Lab Field Kit", qty: 10, price: 120 },
      { id: "itm-8", materialName: "Sensor Pack", qty: 15, price: 60 },
    ],
    invoiceId: null,
    productionOrderId: null,
    timeCount: 0,
    activity: [
      { timestamp: "2024-12-22 08:20", text: "Quote sent to customer." },
    ],
  },
];

export function getCustomers() {
  return Promise.resolve(customers);
}

export function getSalesOrders() {
  return Promise.resolve(salesOrders);
}


# **Discrete ERP‑Lite (SD Module Prototype)**  
*A modular, SAP‑inspired operations system built with React + Node + MongoDB.*

This project is the beginning of a small, intentional ERP‑lite system.  
It’s not trying to be SAP — it’s showing how a clean, modern architecture can express the same ideas without the bloat.

Right now the focus is on **SD (Sales & Distribution)**:

- **Customers**  
- **Sales Orders**

Both modules follow the same design pattern:

- Two‑pane layout (list + detail)  
- Clean, quiet UI  
- Overview / Related / Activity tabs  
- Search + sorting  
- Create + edit forms  
- Defensive, real‑world‑ready data handling  

The goal is to build a system that’s:

- modular  
- walkable  
- predictable  
- easy to extend into MM, PP, FI, HR  
- addresses UI complaints from users 

This repo will eventually include:

- **Backend API** (Node + Express)  
- **MongoDB schema**  
- **MM** (Materials, Stock)  
- **PP** (Production Orders)  
- **FI** (Invoices, Ledger)  
- **HR** (Employees, Time)  

But the SD module is the foundation everything else will sit on.

---

## **Tech Stack**

**Frontend**  
- React  
- Custom layout components (TwoPane, Tabs, etc.)  
- No UI library — intentionally minimal  

**Backend (coming soon)**  
- Node + Express  
- MongoDB (Atlas)  

---

## **Why this exists**

Most ERPs are either:

- enterprise‑heavy, or  
- consumer‑light  

This project explores the middle ground:  
a modular operations engine that can scale from **solo work → small business → family operations** without changing the architecture.

---

## **Status**

- SD module: ~90% front‑end complete  
- Backend: starting soon  
- MM/PP/FI/HR: planned  

---

## **Running the project**

Not complete until backend is wired

```
npm install
npm run dev

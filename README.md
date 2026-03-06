
# 💸 BroBroke 

**BroBroke** is a full-stack MERN application designed for hostel students and friend groups to track shared expenses, late-night food debts, and IOUs. Built with a gritty, retro space-bounty-hunter terminal aesthetic, it calculates exact net balances in real-time, letting you know exactly who owes you credits and whose debts you need to settle.

![BroBroke Theme](https://img.shields.io/badge/UI_Theme-Terminal_Dark-1a1b1e?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active_&_Deployed-00ff41?style=for-the-badge)

 **Check it out here:** [BroBroke Live Demo](https://bro-broke.vercel.app/)

##  Features
* **Bounty Dashboard:** Automatically calculates overall net balances per friend (red for debts, green for credits).
* **Secure Authentication:** Full JWT-based login and registration system.
* **Password Recovery:** Built-in email integration to send secure password reset links.
* **Real-time Ledger:** Add new outgoing/incoming transactions and instantly resolve them with a single click.
* **Responsive Terminal UI:** Custom CSS overriding Bootstrap defaults for a sharp, high-contrast, anime-inspired interface.

##  Tech Stack
**Frontend:**
* React (Vite)
* React Router DOM
* Axios
* Bootstrap 5 (with custom CSS)

**Backend:**
* Node.js & Express
* MongoDB & Mongoose (Atlas)
* JSON Web Tokens (JWT) & Bcrypt.js
* Nodemailer (Gmail integration)

##  Local Setup Instructions

### 1. Clone the Repository
```bash
git clone [https://github.com/Ersatz-xD/BroBroke.git](https://github.com/Ersatz-xD/BroBroke.git)
cd brobroke

```

### 2. Backend Initialization

Open a terminal in the `backend` directory:

```bash
cd backend
npm install

```

Create a `.env` file in the `backend` folder and add your configuration:

```text
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
JWT_SECRET=your_super_secret_jwt_string
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_16_letter_google_app_password

```

Start the server:

```bash
npm start

```

### 3. Frontend Initialization

Open a new terminal in the `frontend` directory:

```bash
cd frontend
npm install

```

Create a `.env` file in the `frontend` folder to connect to your local backend:

```text
VITE_API_URL=http://localhost:5000/api

```

Start the Vite development server:

```bash
npm run dev

```

##  Deployment

* **Frontend:** Hosted on [Vercel](https://vercel.com). Uses a `vercel.json` rewrite configuration for seamless React Router navigation.
* **Backend:** Hosted on [Render](https://render.com) as a Node.js web service.

---



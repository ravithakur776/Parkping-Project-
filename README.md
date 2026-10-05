<div align="center">
  <img src="https://img.shields.io/badge/Status-Live-brightgreen" alt="Status">
  <img src="https://img.shields.io/badge/Angular-v18-dd0031?logo=angular" alt="Angular">
  <img src="https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs" alt="Node.js">
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb" alt="MongoDB">
</div>

<br>

<div align="center">
  <h1>⚡ ParkPing ⚡</h1>
  <p><b>A privacy-first, QR-based vehicle communication platform.</b></p>
</div>

<br>

## 📖 About The Project

**ParkPing** solves a very common, frustrating modern problem: **Blocked Vehicles.** 
When your car is blocked by someone else's vehicle, your only options usually are waiting endlessly, honking aggressively, or hoping they left a phone number on their dashboard.

Leaving personal phone numbers visible on the dashboard is a major privacy and security risk. ParkPing eliminates this risk by replacing phone numbers with secure, anonymous **QR Code Stickers**.

With ParkPing:
1. **Register** your vehicle and generate a unique QR code.
2. **Stick** the QR code on your car window.
3. If your car is blocking someone, they simply **Scan** the QR code.
4. They tap a button on the web app, and you instantly receive a **Live In-App Notification (and SMS via Twilio)** telling you to move your car.
5. **Your personal phone number is never exposed to the public.**

## ✨ Features

- **🛡️ 100% Privacy:** Vehicle owners can be contacted without ever exposing their real phone numbers or names.
- **⚡ Live Desktop Notifications:** Real-time polling and native browser push notifications alert the owner instantly.
- **📱 Responsive Neon UI/UX:** A stunning dark-mode interface with neon accents, optimized for both desktop and mobile devices.
- **🛡️ Anti-Spam Cooldown:** Built-in rate limiting prevents users from spam-pinging the same vehicle owner (1-minute cooldown per vehicle).
- **🔒 Secure Authentication:** JWT-based user authentication and encrypted passwords.
- **💬 Twilio SMS Ready:** Backend is pre-configured to send text messages to vehicle owners (requires Twilio API keys).

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Angular 18 (Standalone Components)
- **Styling:** Custom CSS Grid/Flexbox, CSS Variables (Neon Theme)
- **Libraries:** `angularx-qrcode` for dynamic QR sticker generation
- **HTTP Client:** Built-in Angular HttpClient configured with JWT Bearer Interceptors

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Security:** `bcryptjs` (password hashing), `jsonwebtoken` (auth)
- **APIs:** Twilio SDK for SMS dispatch

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- Node.js (v18 or higher)
- Angular CLI (`npm install -g @angular/cli`)
- MongoDB (Running locally on `mongodb://localhost:27018` or via Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/ravithakur776/Parkping-Project-.git
cd Parkping-Project-
```

### 2. Setup the Backend
Open a terminal in the root directory:
```bash
cd backend
npm install
```
Create a `.env` file in the `/backend` directory:
```env
PORT=5001
MONGO_URI=mongodb://localhost:27018/parkping
JWT_SECRET=your_super_secret_jwt_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_phone
```
Start the backend server:
```bash
node index.js
```

### 3. Setup the Frontend
Open a **new** terminal window:
```bash
cd frontend
npm install
```
Start the Angular development server:
```bash
ng serve
```
Open your browser and navigate to `http://localhost:4200`.

---

## 📸 Usage Workflow
1. **Sign Up:** Create a new account with your Name, Email, Password, and Phone Number.
2. **Dashboard:** Go to your dashboard and click "+ Add Vehicle".
3. **Generate:** Enter your vehicle model and plate number. The app generates a unique QR Code.
4. **Download & Print:** Download the QR code image and stick it to your windshield.
5. **Scan:** Anyone who scans it will be taken to a secure URL (e.g., `/requests?vehicle=XYZ`).
6. **Alert:** When they press "Notify Owner", you receive an instant dashboard alert and/or SMS!

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check [issues page](https://github.com/ravithakur776/Parkping-Project-/issues).

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).

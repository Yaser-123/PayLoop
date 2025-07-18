<div align="center">

# 🔄 PayLoop

### *Smart Subscription Management & Automated Reminder System*

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)

*Never miss a subscription renewal again with intelligent automated reminders*

[🚀 Live Demo](https://payloop-r4mr.onrender.com/) • [📖 Documentation](#-api-documentation) • [🛠️ Installation](#-quick-start)

</div>

---

## ✨ What is PayLoop?

PayLoop is a **comprehensive subscription management ecosystem** that transforms how you track and manage recurring payments. Built with enterprise-grade security and intelligent automation, it delivers personalized renewal reminders through sophisticated workflow orchestration.

### 🎯 **Core Value Proposition**
- **Zero Missed Renewals**: Advanced 4-tier reminder system (7→5→2→1 days)
- **Enterprise Security**: Multi-layered protection with Arcjet integration
- **Intelligent Workflows**: Upstash-powered automation that adapts to your schedule
- **Universal Compatibility**: Support for all major payment methods and currencies

---

## 🚀 **Key Features**

<table>
<tr>
<td width="50%">

### 🔐 **Security & Authentication**
- JWT-based secure authentication
- Arcjet bot detection & rate limiting
- Password encryption with bcrypt
- Role-based access control

### 📊 **Smart Management**
- Real-time subscription tracking
- Automated renewal calculations
- Multi-currency support (USD, EUR, GBP, INR)
- Flexible billing cycles

</td>
<td width="50%">

### 🔔 **Intelligent Reminders**
- 4-tier reminder system (7, 5, 2, 1 days)
- Workflow state management
- Email template customization
- Timezone-aware scheduling

### 💳 **Payment Integration**
- Credit Card, PayPal, Bank Transfer
- Subscription categorization
- Price tracking & analytics
- Status monitoring (Active/Inactive/Pending)

</td>
</tr>
</table>

---

## 🛠️ **Tech Stack**

<div align="center">

| **Backend** | **Database** | **Security** | **Workflow** | **Tools** |
|-------------|--------------|--------------|--------------|-----------|
| Node.js + Express | MongoDB + Mongoose | Arcjet + JWT | Upstash Workflow | Day.js + Nodemailer |

</div>

---

## ⚡ **Quick Start**

### Prerequisites
```bash
Node.js v16+ | MongoDB | Upstash Account | Arcjet Account
```

### 1️⃣ **Clone & Install**
```bash
git clone https://github.com/Yaser-123/PayLoop.git
cd PayLoop
npm install
```

### 2️⃣ **Environment Configuration**
Create `.env.development.local`:
```env
# Server Configuration
PORT=5500
SERVER_URL=http://localhost:5500
NODE_ENV=development

# Database
DB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_super_secure_jwt_secret
JWT_EXPIRES_IN=1d

# Security (Arcjet)
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development

# Workflow Engine (Upstash)
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=your_qstash_token

# Email Service
EMAIL_PASSWORD=your_gmail_app_password
```

### 3️⃣ **Launch Application**
```bash
# Development Mode
npm run dev

# Production Mode
npm start
```

---

## 📚 **API Documentation**

### 🔐 **Authentication Endpoints**

<details>
<summary><strong>POST</strong> <code>/api/v1/auth/sign-up</code> - Register New User</summary>

```http
POST /api/v1/auth/sign-up
Content-Type: application/json

{
  "name": "Mohamed Yaser",
  "email": "1ammar.yaser@gmail.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully!",
  "data": {
    "userId": "64a7f8b2c1d2e3f4a5b6c7d8",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```
</details>

<details>
<summary><strong>POST</strong> <code>/api/v1/auth/sign-in</code> - User Login</summary>

```http
POST /api/v1/auth/sign-in
Content-Type: application/json

{
  "email": "1ammar.yaser@gmail.com",
  "password": "securePassword123"
}
```
</details>

### 📋 **Subscription Management**

<details>
<summary><strong>POST</strong> <code>/api/v1/subscriptions</code> - Create Subscription</summary>

```http
POST /api/v1/subscriptions
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "name": "Netflix Premium",
  "price": 15.99,
  "currency": "USD",
  "frequency": "monthly",
  "category": "premium",
  "startDate": "2025-01-15T00:00:00.000Z",
  "paymentMethod": "credit_card"
}
```

**Supported Values:**
- **Categories**: `basic`, `premium`, `enterprise`
- **Payment Methods**: `credit_card`, `paypal`, `bank_transfer`
- **Frequencies**: `daily`, `weekly`, `monthly`, `yearly`
- **Currencies**: `USD`, `EUR`, `GBP`, `INR`
</details>

<details>
<summary><strong>GET</strong> <code>/api/v1/subscriptions/user/:userId</code> - Get User Subscriptions</summary>

```http
GET /api/v1/subscriptions/user/64a7f8b2c1d2e3f4a5b6c7d8
Authorization: Bearer <your_jwt_token>
```
</details>

---

## 🏗️ **Project Architecture**

```
PayLoop/
├── 🚀 app.js                      # Application entry point
├── ⚙️ config/
│   ├── arcjet.js                  # Security configuration
│   ├── env.js                     # Environment management
│   ├── nodemailer.js              # Email service setup
│   └── upstash.js                 # Workflow client
├── 🎮 controllers/
│   ├── auth.controller.js         # Authentication logic
│   ├── subscription.controller.js # Subscription operations
│   ├── user.controller.js         # User management
│   └── workflow.controller.js     # Automated workflows
├── 🗃️ database/
│   └── mongodb.js                 # Database connection
├── 🛡️ middlewares/
│   ├── arcjet.middleware.js       # Security layer
│   ├── auth.middleware.js         # JWT verification
│   └── error.middleware.js        # Error handling
├── 📊 models/
│   ├── subscription.model.js      # Subscription schema
│   └── user.model.js              # User schema
├── 🛣️ routes/
│   ├── auth.routes.js             # Authentication routes
│   ├── subscription.routes.js     # Subscription routes
│   ├── user.routes.js             # User routes
│   └── workflow.routes.js         # Workflow routes
└── 🔧 utils/
    ├── email-template.js          # Email templates
    └── send-email.js              # Email utilities
```

---

## 🔄 **Intelligent Workflow System**

PayLoop's workflow engine automatically:

1. **🎯 Workflow Creation**: Triggers when new subscription is added
2. **📅 Smart Scheduling**: Calculates optimal reminder timing
3. **🔔 Multi-Tier Alerts**: 7→5→2→1 day reminder sequence
4. **⚡ State Management**: Handles active/inactive/pending states
5. **🛑 Auto-Cleanup**: Stops workflows for expired subscriptions

### **Workflow Timeline Example**
```
� Subscription Created → 🔄 Workflow Initiated
⏰ 7 Days Before → 📧 First Reminder
⏰ 5 Days Before → 📧 Second Reminder  
⏰ 2 Days Before → 📧 Third Reminder
⏰ 1 Day Before → 📧 Final Reminder
💳 Renewal Date → 🔄 Workflow Complete
```

---

## 🔒 **Enterprise Security**

<table>
<tr>
<td width="50%">

### **Authentication Layer**
- ✅ JWT token-based auth
- ✅ Bcrypt password hashing
- ✅ Session management
- ✅ Secure headers

</td>
<td width="50%">

### **Protection Layer (Arcjet)**
- ✅ Rate limiting (token bucket)
- ✅ Bot detection & filtering
- ✅ Shield protection
- ✅ IP-based restrictions

</td>
</tr>
</table>

---

## 🚀 **Deployment Guide**

### **Production Environment Setup**

1. **Environment Configuration**
   ```bash
   # Create production environment file
   touch .env.production.local
   
   # Set production variables
   NODE_ENV=production
   DB_URI=your_production_mongodb_uri
   ```

2. **Platform Deployment** (Render/Heroku/Vercel)
   ```bash
   # Build command
   npm install
   
   # Start command  
   npm start
   ```

3. **Environment Variables** (Set in your hosting platform)
   - `DB_URI` - Production MongoDB connection
   - `JWT_SECRET` - Production JWT secret
   - `ARCJET_KEY` - Production Arcjet key
   - `QSTASH_TOKEN` - Production Upstash token

---

## �‍💻 **About the Developer**

<div align="center">

### **Mohamed Yaser** 
*Full-Stack Developer & Software Architect*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mohamedyaser08/)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/tmohamedyaser)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=About.me&logoColor=white)](https://mohdyaser.vercel.app/)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:1ammar.yaser@gmail.com)

</div>

---

## 🤝 **Contributing**

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## � **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### � **PayLoop - Smart Subscription Management**
*Built with ❤️ by Mohamed Yaser*

**⭐ Star this repo if you find it helpful!**

</div>

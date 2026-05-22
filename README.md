# FootballIQ ⚽

FootballIQ is a full-stack football analytics platform that provides live football data, team and player insights, standings, and personalized experiences for football fans.

🌐 **Live Demo:** https://football-iq-tau.vercel.app/

---

## 🚀 Features

### 🔐 Authentication & Personalization
- User Signup & Login (JWT Authentication)
- Secure authentication using Spring Security + JWT
- Personalized dashboard
- Save favorite teams and players
- Persistent user data using PostgreSQL

### ⚽ Football Analytics
- Live league standings
- Match fixtures and recent results
- Team details and squad information
- Team recent match history
- Player details page
- Top scorers leaderboard
- Search for teams and players

### 🎨 Modern UI/UX
- Responsive football-themed UI
- Dark premium design
- Interactive navigation and search
- Smooth user experience with React

### ☁️ Deployment
- Frontend deployed on **Vercel**
- Backend deployed on **Render (Dockerized Spring Boot)**
- Database hosted on **Neon PostgreSQL**

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend
- Spring Boot
- Spring Security
- JWT Authentication
- REST APIs
- Maven
- Docker

### Database
- PostgreSQL (Neon)

### Deployment
- Vercel
- Render
- Docker

---

## 🏗 Project Architecture

Frontend (React + Vite)  
↓  
REST API (Spring Boot)  
↓  
PostgreSQL (Neon DB)  
↓  
Render + Vercel Deployment

---

## ⚙️ Local Setup

### Clone Repository

```bash
git clone https://github.com/Aryan1736/FootballIQ.git
cd FootballIQ
```

### Backend Setup

```bash
cd backened
```

Create environment variables:

```properties
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=
FOOTBALL_API_KEY=
JWT_SECRET=
JWT_EXPIRATION_MS=
```

Run backend:

```bash
mvn spring-boot:run
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔮 Future Improvements

FootballIQ is actively evolving. Planned improvements include:

### 🤖 AI & Machine Learning
- AI-powered football insights and match summaries
- Match prediction models
- Team form and performance analysis using ML
- Smart recommendation system for teams and players

### 📊 Advanced Analytics
- Player vs Player comparison system
- Team performance analytics dashboard
- Tactical and statistical visualizations
- Historical trend analysis

---

## 👨‍💻 Developer

**Aryan Bagchi**  
B.Tech Computer Engineering | IIIT Bhubaneswar

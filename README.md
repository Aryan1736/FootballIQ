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

### ⚡ Performance & Caching
- Redis-powered caching for faster API responses
- Reduced external football API calls
- Improved backend performance and lower latency
- Production-grade cache layer with Spring Cache (`@Cacheable`)

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
- Redis cache hosted on **Redis Cloud**

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
- Spring Cache
- Maven
- Docker

### Database & Caching
- PostgreSQL (Neon)
- Redis Cloud

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
Redis Cache Layer  
↓  
PostgreSQL (Neon DB) + Football Data API  
↓  
Render + Vercel Deployment

---

## 🔮 Future Improvements

FootballIQ is actively evolving. Planned improvements include:

### 🤖 AI & Machine Learning
- AI-powered football insights and match summaries
- Match prediction models
- Team form and performance analysis using ML
- Smart recommendation system for teams and players

### 🚀 Platform Enhancements
- Real-time live match updates using WebSockets
- Notification system for favorite teams
- Advanced search and filtering
- More leagues and competitions
- Microservices and cloud scalability exploration

---

## 👨‍💻 Developer

**Aryan Bagchi**  
B.Tech Computer Engineering | IIIT Bhubaneswar

# 🌟 Campus Buddy – Your AI Companion for Study & Support

[Live Demo 🚀](https://campusbuddyiem.web.app)

---

## 📚 Overview
Campus Buddy is a web app designed for college students, combining:
- **AI-powered Study Assistant**: Get instant, concise notes and curated YouTube playlists for any topic.
- **Anonymous Mental Health Support Chatbot**: Chat with an AI for emotional support, stress management, and daily affirmations.

---

## ✨ Features
- **Study Zone**
  - Enter any academic topic and get AI-generated notes (powered by Gemini API)
  - Receive top YouTube video recommendations
  - Optionally save topics (Firebase-ready)
- **Mental Health Zone**
  - Anonymous chat with a gentle, supportive AI
  - Daily positive quote/affirmation
- **About the Developer**
  - Learn more about the creator via a modern modal popup
- **Modern, Responsive UI**
  - Clean, calming design for focus and comfort

---

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **AI**: Google Gemini API (via secure Node.js proxy)
- **Backend Proxy**: Node.js, Express, node-fetch, CORS
- **Hosting**: Firebase Hosting (static frontend), Render (Node.js proxy)

---

## 🚀 Getting Started (Local Development)

### 1. Clone the Repo
```sh
git clone https://github.com/YOUR_USERNAME/CampusBuddy.git
cd CampusBuddy
```

### 2. Install Backend Dependencies
```sh
npm install
```

### 3. Set Up Gemini API Key
- Create a `.env` file (optional, for local dev) and add:
  ```
  GEMINI_API_KEY=your-gemini-api-key-here
  ```
- Or set the environment variable directly in your deployment platform (Render, Railway, etc.)

### 4. Start the Proxy Server
```sh
node server.js
```

### 5. Serve the Frontend
- Use VS Code Live Server, `python -m http.server`, or `npx serve .`

### 6. Open in Browser
- Visit `http://localhost:5000` (or your local server port)

---

## 🌐 Deployment

### **Frontend (Firebase Hosting)**
1. Install Firebase CLI:
   ```sh
   npm install -g firebase-tools
   ```
2. Login and initialize:
   ```sh
   firebase login
   firebase init hosting
   ```
3. Deploy:
   ```sh
   firebase deploy
   ```

### **Backend Proxy (Render/Other)**
1. Push your code to GitHub
2. Create a new Web Service on [Render](https://render.com/)
3. Set the start command to `npm start` or `node server.js`
4. Add your Gemini API key as an environment variable
5. Use the public Render URL in your frontend's `app.js`:
   ```js
   const GEMINI_PROXY_URL = 'https://your-app-name.onrender.com/api/gemini';
   ```
6. Redeploy your frontend to Firebase Hosting

---

## 🔒 Security Best Practices
- **Never commit API keys to public repos!** Use environment variables.
- Use a backend proxy to keep your Gemini API key secret.
- Add `.env` to `.gitignore` if using dotenv locally.

---

## 👨‍💻 About the Developer
**Ishan Mishra and Pragya Kumari Mishra** is an engineering student with an insatiable curiosity for technology. His journey into the world of coding began with a fascination for innovation and how things work. When they are  not coding, they explores new places, capture moments in vlogs, and immerse themselves in hip-hop music. they are a storyteller and dreamer, eager to connect with others to create something extraordinary.

---

## 🤝 Credits & Inspiration
- [Google Gemini API](https://aistudio.google.com/app/apikey)
- [Firebase Hosting](https://firebase.google.com/)
- [Render](https://render.com/)
- [YouTube](https://youtube.com/)

---

## 📬 Feedback & Contributions
Pull requests, issues, and suggestions are welcome!

---

> Made with ❤️ by Ishan and Pragya

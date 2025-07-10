// --- Study Zone ---
const studyForm = document.getElementById('study-form');
const topicInput = document.getElementById('topic-input');
const studyResults = document.getElementById('study-results');
const saveTopicBtn = document.getElementById('save-topic-btn');

// --- Gemini API Integration ---
const GEMINI_PROXY_URL = 'http://localhost:3001/api/gemini';

async function fetchGeminiNotesAndVideos(topic) {
  // Improved prompt for better structure
  const prompt = `Summarize the following academic topic in 3-5 short, clear bullet points for a college student. Then, recommend 2-3 high-quality YouTube video links for this topic, each on a new line.\n\nTopic: ${topic}\n\nFormat:\nNotes:\n- (bullet point 1)\n- (bullet point 2)\nYouTube:\nhttps://youtube.com/...`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };
  const response = await fetch(GEMINI_PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error('Gemini API error');
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  // Extract notes between 'Notes:' and 'YouTube:'
  let notes = '';
  const notesMatch = text.match(/Notes:[\s\S]*?YouTube:/i);
  if (notesMatch) {
    notes = notesMatch[0].replace(/Notes:|YouTube:/gi, '').trim();
  }
  // Extract YouTube links
  const videoLinks = [];
  const urlRegex = /(https?:\/\/www\.youtube\.com\/watch\?v=[\w-]+)/g;
  let match;
  while ((match = urlRegex.exec(text)) !== null) {
    videoLinks.push(match[0]);
  }
  return { notes, videos: videoLinks };
}

async function fetchGeminiChatReply(message) {
  // This function calls Gemini API to get a supportive chatbot reply
  const prompt = `You are an anonymous, gentle mental health support bot for stressed college students. Respond supportively to: "${message}"`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };
  const response = await fetch(GEMINI_PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error('Gemini API error');
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
}

studyForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const topic = topicInput.value.trim();
  if (!topic) return;
  studyResults.innerHTML = '<em>Loading AI notes and videos...</em>';
  saveTopicBtn.style.display = 'none';
  try {
    const { notes, videos } = await fetchGeminiNotesAndVideos(topic);
    let html = '';
    if (notes) {
      html += `<strong>AI Notes for <u>${topic}</u>:</strong><br><ul><li>${notes.replace(/\n/g, '</li><li>')}</li></ul>`;
    }
    if (videos && videos.length) {
      html += '<strong>YouTube Recommendations:</strong><ul>';
      videos.forEach(link => {
        html += `<li><a href="${link}" target="_blank">${link}</a></li>`;
      });
      html += '</ul>';
    }
    studyResults.innerHTML = html || '<em>No results found.</em>';
    saveTopicBtn.style.display = 'inline-block';
  } catch (err) {
    studyResults.innerHTML = '<span style="color:red;">Error fetching from Gemini API.</span>';
  }
});

saveTopicBtn.addEventListener('click', () => {
  // --- Firebase Firestore integration placeholder ---
  // Save the topic to Firestore here
  alert('Topic saved! (Firestore integration placeholder)');
});

// --- Mental Health Zone ---
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMsg = chatInput.value.trim();
  if (!userMsg) return;
  appendMessage('You', userMsg);
  chatInput.value = '';
  try {
    const botReply = await fetchGeminiChatReply(userMsg);
    appendMessage('Buddy', botReply);
  } catch (err) {
    appendMessage('Buddy', 'Sorry, I could not connect to the Gemini API.');
  }
});

function appendMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
  msgDiv.style.marginBottom = '0.5rem';
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// --- Daily Affirmation ---
const affirmations = [
  "You are capable of amazing things!",
  "Every day is a fresh start.",
  "You are stronger than you think.",
  "Believe in yourself and all that you are.",
  "Progress, not perfection.",
  "You matter and your feelings are valid."
];
function showAffirmation() {
  const affirmationDiv = document.getElementById('affirmation');
  const idx = new Date().getDate() % affirmations.length;
  affirmationDiv.textContent = affirmations[idx];
}
showAffirmation();

// --- About the Developer Modal ---
const aboutLink = document.getElementById('about-link');
const aboutModal = document.getElementById('about-modal');
const closeModal = document.getElementById('close-modal');

aboutLink.addEventListener('click', (e) => {
  e.preventDefault();
  aboutModal.style.display = 'flex';
});
closeModal.addEventListener('click', () => {
  aboutModal.style.display = 'none';
});
window.addEventListener('click', (e) => {
  if (e.target === aboutModal) {
    aboutModal.style.display = 'none';
  }
}); 
<template>
  <div class="mood-container">
    <h2>Mood Check-in</h2>

    <input
      v-model="name"
      placeholder="Your name (optional)"
      class="mood-input"
    />
    <textarea
      v-model="mood"
      placeholder="How are you feeling today?"
      class="mood-textarea"
    ></textarea>

    <button @click="submitMood" class="mood-button">Submit</button>

    <p v-if="aiMessage" class="ai-message">
      AI Advisor: {{ aiMessage }}
    </p>

    <div class="history-container">
      <h3>Mood History</h3>
      <ul v-if="moods.length">
        <li v-for="m in moods" :key="m.id">
          <strong>{{ m.full_name || "Anonymous" }}:</strong> {{ m.mood_text }}
          <br />
          <em>AI Advisor: {{ m.ai_message }}</em>
        </li>
      </ul>
      <p v-else>No mood entries yet.</p>
    </div>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  data() {
    return {
      name: "",
      mood: "",
      aiMessage: "",
      moods: []
    };
  },
  async mounted() {
    await this.fetchMoods(); // load history when component mounts
  },
  methods: {
    async submitMood() {
      if (!this.mood.trim()) return;

      try {
        // Post mood to backend
        const res = await api.post("/", {
          full_name: this.name || "Anonymous",
          mood_text: this.mood
        });

        // Display AI advisory
        this.aiMessage = res.data.ai_message;

        // Clear input fields
        this.mood = "";
        this.name = "";

        // Refresh history
        await this.fetchMoods();
      } catch (err) {
        console.error("Error submitting mood:", err);
      }
    },
    async fetchMoods() {
      try {
        const res = await api.get("/"); // GET all moods
        this.moods = res.data;
      } catch (err) {
        console.error("Error fetching moods:", err);
      }
    }
  }
};
</script>

<style scoped>
.mood-container {
  max-width: 450px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  text-align: center;
  font-family: Arial, sans-serif;
  color: #333;
}

.mood-input,
.mood-textarea {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  color: #333;
}

.mood-textarea { resize: vertical; min-height: 80px; }

.mood-button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.mood-button:hover { background-color: #45a049; }

.ai-message { margin-top: 20px; font-style: italic; color: #111; }

.history-container { margin-top: 30px; text-align: left; }
</style>

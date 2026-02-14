<template>
  <div>
    <h2>Mood History</h2>
    <ul>
      <li v-for="mood in moods" :key="mood.id">
        <strong>{{ mood.full_name }}:</strong> {{ mood.mood_text }}
        <br />
        <em>AI Advisor: {{ mood.ai_message }}</em>
        <hr />
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../services/api"; // ✅ connects to api.js

export default {
  data() {
    return {
      moods: []
    };
  },
  async mounted() {
    try {
      const res = await api.get("/");  // GET request to backend
      this.moods = res.data;          // store all moods in component
    } catch (err) {
      console.error("Error fetching moods:", err);
    }
  }
};
</script>

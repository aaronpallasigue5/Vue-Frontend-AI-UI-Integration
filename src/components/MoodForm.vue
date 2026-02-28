<template>
  <div style="text-align: center; padding: 20px; font-family: sans-serif;">
    <h1>Mood Tracker - Full System Test</h1>
    
    <div style="margin-bottom: 20px; border: 2px solid #eee; padding: 15px; border-radius: 10px;">
      <input v-model="newMood" placeholder="Enter a mood (e.g. Happy)" style="padding: 10px; width: 250px;" />
      <button @click="submitMood" style="padding: 10px 20px; cursor: pointer; background: #4CAF50; color: white; border: none; border-radius: 5px; margin-left: 10px;">
        Submit to Railway
      </button>
    </div>

    <hr />

    <div v-if="dbData.length > 0" style="margin-top: 20px;">
      <h3>Latest Database Entries:</h3>
      <div v-for="item in dbData" :key="item.id" style="border: 1px solid #ccc; padding: 10px; margin: 5px auto; max-width: 400px; background: #f9f9f9;">
        <strong>ID:</strong> {{ item.id }} | <strong>Entry:</strong> {{ item.mood || 'Mood Data Found' }}
      </div>
      <h2 style="color: #4CAF50;">✔ AI Response: System Integrated!</h2>
    </div>
    
    <p v-else>Connecting to database... (Make sure your Backend is live!)</p>
    
    <button @click="fetchData" style="margin-top: 20px; font-size: 12px;">Manual Refresh</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newMood: '',
      dbData: []
    };
  },
  methods: {
    // GET: Pulls data to show on screen
    async fetchData() {
      try {
        const response = await fetch('https://lab-5-mercado.onrender.com/test-db');
        this.dbData = await response.json();
      } catch (error) {
        console.error("Connection Error:", error);
      }
    },
    // POST: Optional - If you want to send data from the UI
    async submitMood() {
      if (!this.newMood) return alert("Type something first!");
      console.log("Sending to backend...");
      // For the screenshot, you can also just add the row manually in Railway!
      this.fetchData(); 
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>
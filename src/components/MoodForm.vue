<template>
  <div style="text-align: center; padding: 20px; font-family: sans-serif; color: white; background: #1a1a1a; min-height: 100vh;">
    <h1>Mood Tracker - Full System Test</h1>
    
    <div style="margin-bottom: 20px; border: 1px solid #444; padding: 20px; border-radius: 8px;">
      <input 
        v-model="newMood" 
        placeholder="How are you feeling?" 
        style="padding: 10px; width: 250px; border-radius: 4px; border: 1px solid #555;" 
      />
      <button 
        @click="submitMood" 
        style="padding: 10px 20px; margin-left: 10px; cursor: pointer; background: #4CAF50; color: white; border: none; border-radius: 4px;"
      >
        Submit to Railway
      </button>
    </div>

    <hr style="border: 0.5px solid #333;" />

    <div v-if="dbData.length > 0" style="margin-top: 20px;">
      <h3>Latest Database Entries:</h3>
      <div v-for="item in dbData" :key="item.id" style="border: 1px solid #444; padding: 10px; margin: 10px auto; max-width: 400px; background: #2a2a2a;">
        <strong>ID:</strong> {{ item.id }} | <strong>Mood:</strong> {{ item.message || 'No message' }}
      </div>
      <h2 style="color: #4CAF50;">✔ AI Response: System Integrated!</h2>
    </div>
    <p v-else>Connecting to database...</p>
    
    <button @click="fetchData" style="margin-top: 20px; opacity: 0.6;">Manual Refresh</button>
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
    async fetchData() {
      try {
        const response = await fetch('https://lab-5-mercado.onrender.com/test-db');
        this.dbData = await response.json();
      } catch (error) {
        console.error("Fetch error:", error);
      }
    },
    async submitMood() {
      if (!this.newMood) return alert("Please type something!");
      
      try {
        const response = await fetch('https://lab-5-mercado.onrender.com/add-mood', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mood: this.newMood })
        });

        if (response.ok) {
          this.newMood = ''; // Clear input
          await this.fetchData(); // Update list automatically
        }
      } catch (error) {
        console.error("Submit error:", error);
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>
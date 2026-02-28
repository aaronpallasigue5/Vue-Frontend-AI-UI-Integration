<template>
  <div style="text-align: center; padding: 20px; font-family: sans-serif; background: #121212; color: white; min-height: 100vh;">
    <h1>Mood Tracker - Full System</h1>
    
    <div style="margin-bottom: 30px; display: flex; flex-direction: column; align-items: center; gap: 10px;">
      <input v-model="formData.name" placeholder="Your Name" style="padding: 10px; width: 250px;" />
      <input v-model="formData.email" placeholder="Your Email" style="padding: 10px; width: 250px;" />
      <input v-model="formData.mood" placeholder="How are you feeling?" style="padding: 10px; width: 250px;" />
      
      <button @click="submitData" style="padding: 12px 20px; background: #4CAF50; color: white; border: none; cursor: pointer; font-weight: bold;">
        Submit to Railway
      </button>
    </div>

    <div v-if="dbData.length > 0">
      <h3>Latest Database Entries:</h3>
      <div v-for="item in dbData" :key="item.id" style="border: 1px solid #333; padding: 15px; margin: 10px auto; max-width: 400px; background: #1e1e1e; text-align: left;">
        <strong>ID:</strong> {{ item.id }} | <strong>Name:</strong> {{ item.name || 'N/A' }} <br>
        <strong>Mood:</strong> {{ item.message || 'N/A' }}
      </div>
      <h2 style="color: #4CAF50;">✔ System Integrated!</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: { name: '', email: '', mood: '' },
      dbData: []
    };
  },
  methods: {
    async fetchData() {
      const res = await fetch('https://lab-5-mercado.onrender.com/test-db');
      this.dbData = await res.json();
    },
    async submitData() {
      if (!this.formData.name || !this.formData.mood) return alert("Fill Name and Mood!");
      
      await fetch('https://lab-5-mercado.onrender.com/add-mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.formData)
      });
      
      this.formData = { name: '', email: '', mood: '' }; // Clear form
      this.fetchData(); // Refresh list
    }
  },
  mounted() { this.fetchData(); }
};
</script>
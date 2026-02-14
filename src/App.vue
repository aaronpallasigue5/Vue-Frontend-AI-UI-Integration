<template>
  <div>
    <MoodForm @mood-submitted="addMood" />
    <MoodHistory :moods="moods" />
  </div>
</template>

<script>
import MoodForm from "./components/MoodForm.vue";
import MoodHistory from "./components/MoodHistory.vue";
import api from "./services/api";

export default {
  components: { MoodForm, MoodHistory },
  data() {
    return {
      moods: []
    };
  },
  async created() {
    // Fetch existing moods once
    const res = await api.get("/");
    this.moods = res.data;
  },
  methods: {
    addMood(newMood) {
      // Add new mood to the top of the list
      this.moods.unshift(newMood);
    }
  }
};
</script>

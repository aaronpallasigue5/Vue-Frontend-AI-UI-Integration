import axios from "axios";

export default axios.create({
  // Replace 'mental-health-api' with your actual Render service name later
  baseURL: "https://mental-health-api.onrender.com/api/moods" 
});
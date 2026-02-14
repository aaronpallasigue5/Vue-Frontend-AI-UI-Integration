import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api/moods" // points to your backend moods route
});

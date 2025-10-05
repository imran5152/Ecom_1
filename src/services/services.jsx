import axios from "axios";

const API = axios.create({
  baseURL: "https://back-eccom-2.onrender.com", 
});

export default API;
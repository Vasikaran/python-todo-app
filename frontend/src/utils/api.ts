import axios from "axios";
import { auth } from "./firebase";

const apiURL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: apiURL,
  // withCredentials: true,
});

apiClient.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

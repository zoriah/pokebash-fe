import axios from "axios";

const BACKEND_URL = "http://localhost:8000/leaderboard"; // Backend URL

export const backendAPI = axios.create({
  baseURL:BACKEND_URL,
  headers: { 
    "Content-Type": "application/json"
},
  //When the backend project is ready and working, the port should be replaced here for port:2005
});


export const fetchLeaderboard = async () => {
  try {
    const response = await backendAPI.get('/');
    //const response = await axios.get(BACKEND_URL);
    console.log("API Response:", response); // Debugging
    //return Array.isArray(response.data) ? response.data : []; // Ensure it’s always an array
    return response.data;
  } catch (error) {
    console.error("Failed to get data!", error);
    return [];
  }
};

// 📌 create a score
export const createScore = async (username, score) => {
  try {
    const response = await backendAPI.post('/', { username, score });
    return response.data;
  } catch (error) {
    console.error("failed to post data", error);
    throw error;
  }
};

// 📌 Update a score
export const updateScore = async (id, newScore) => {
  try {
    const response = await backendAPI.put(`/${id}`, { score: newScore });
    return response.data;
  } catch (error) {
    console.error("Failed to update data", error);
    throw error;
  }
};

// 📌 Delete a score
export const deleteScore = async (id) => {
  try {
    const response = await backendAPI.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete data", error);
    throw error;
  }
};
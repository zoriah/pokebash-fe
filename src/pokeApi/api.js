import axios from "axios";

export const backendAPI = axios.create({
  baseURL: "http://localhost:2005",
  //When the backend project is ready and working, the port should be replaced here for port:2005
});

export const pokeAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

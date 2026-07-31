import api from "./axios";

// REGISTER
export const register = async (data) => {
  console.log("clicked");
  
   return await api.post("/users", data);
};
// LOGIN
export const login = async (data) => {
  return await api.post("/users/login", data);
};

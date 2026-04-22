import api from "./axios";

// REGISTER
export const register = (data) => {
  return api.post("/users", data);
};

// LOGIN
export const login = (data) => {
  return api.post("/users/login", data);
};

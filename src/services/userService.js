import axios from "../axios";
const handleLoginApi = (a, b) => {
  return axios.post("http://localhost:8080/api/login", {
    email: a,
    password: b,
  });
};
const getAllUsers = (inputId) => {
  return axios.get(`http://localhost:8080/api/get-all-users?id=${inputId}`);
};
export { handleLoginApi, getAllUsers };

import axios from "../axios";
const handleLoginApi = (a, b) => {
  return axios.post("http://localhost:8080/api/login", { email: a, password : b});
};
export { handleLoginApi };

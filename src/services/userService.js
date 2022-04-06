import axios from "../axios";
const handleLoginApi = (a, b) => {
  return axios.post("http://localhost:8080/api/login", {
    email: a,
    password: b,
  });
};
const getAllUsers = (a) => {
  // return axios.get(`http://localhost:8080/api/get-all-users?id=${inputId}`);
  return axios.get("http://localhost:8080/api/get-all-users", {
    params: { id: a },
  });
};

const createNewUserService = async (data) => {
  // console.log('check data from service:', data)
  return axios.post("http://localhost:8080/api/create-new-user", data);
};

const deleteUserService = async (a) => {
  // console.log('check data from service:', a)
  return axios.delete("http://localhost:8080/api/delete-user", {
    data: { id: a.id },
  });
};

const editUserSercice = async (a) => {
  // console.log('check data from service:', a)
  return axios.put("http://localhost:8080/api/edit-user", a);
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserSercice,
};

import axios from "axios";
import { useState, useEffect } from "react";

const C3 = ({ b }) => {
  const [a, setA] = useState({
    id: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    gender: "",
    roleId: "",
  });

  useEffect(() => {
    setA({
      id: b.id,
      email: b.email,
      password: "123456",
      firstName: b.firstName,
      lastName: b.lastName,
      address: b.address,
      gender: b.gender,
      roleId: b.roleId,
    });
  }, []);

  // useEffect(() => {
  //   B();
  // }, []);
  let A = (e, T) => {
    setA({ ...a, [T]: e.target.value });
  };
  let B = async (a) => {
    try {
      let res = await axios.put("http://localhost:8080/api/edit-user", a);
      console.log("Thực hiện hàm B", res);
    } catch (e) {
      console.log(e);
    }
  };
  // console.log("Check C3 - b", b);
  console.log("Check C3 - a", a);
  return (
    <div>
      <form className="" id="">
        <div className="">
          <label>Email</label>
          <input
            type="email"
            className=""
            onChange={(e) => {
              A(e, "email");
            }}
            value={a.email}
            disabled
          />
        </div>
        <div className="">
          <label>Password</label>
          <input
            type="password"
            className=""
            onChange={(e) => {
              A(e, "password");
            }}
            value={a.password}
            disabled
          />
        </div>
        <div className="">
          <label>First Name</label>
          <input
            type="text"
            className=""
            onChange={(e) => {
              A(e, "firstName");
            }}
            value={a.firstName}
          />
        </div>
        <div className="">
          <label>Last Name</label>
          <input
            type="text"
            className=""
            onChange={(e) => {
              A(e, "lastName");
            }}
            value={a.lastName}
          />
        </div>
        <div className="">
          <label>Address</label>
          <input
            type="text"
            className=""
            onChange={(e) => {
              A(e, "address");
            }}
            value={a.address}
          />
        </div>
        <div class="">
          <input
            type="radio"
            name="gender"
            checked={a.gender === 1}
            onClick={() => {
              setA({ ...a, gender: 1 });
            }}
          />
          <a>Nam</a>
          <input
            type="radio"
            name="gender"
            checked={a.gender === 0}
            onClick={() => {
              setA({ ...a, gender: 0 });
            }}
          />
          <a>Nữ</a>
        </div>
        <div class="">
          <label for="inputState" class="form-label col-12">
            Role Id
          </label>
          <select
            id=""
            class=""
            value={a.roleId}
            onChange={(e) => {
              setA({ ...a, roleId: e.target.value });
            }}
          >
            <option value="">Choose</option>
            <option selected value="1">
              Admin
            </option>
            <option value="2">Doctor</option>
            <option value="3">Patient</option>
            <option>Khác</option>
          </select>
        </div>

        <button
          color=""
          className=""
          onClick={() => {
            B(a);
          }}
        >
          Update
        </button>
        <button>Close</button>
      </form>
    </div>
  );
};

export default C3;

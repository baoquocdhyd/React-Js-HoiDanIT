import { useEffect, useState } from "react";
import axios from "axios";
import C2 from "./C2.js";
import C3 from "./C3.js";
const C1 = () => {
  const [a, setA] = useState([]);
  const [b, setB] = useState({});
  const [c, setC] = useState(false);
  const [d, setD] = useState(false);

  const F = async () => {
    const A = await axios.get("http://localhost:8080/api/get-all-users", {
      params: { id: "ALL" },
    });
    setA(A.data.users);
  };
  useEffect(() => {
    F();
  }, []);
  // console.log("Check C1 - b", b);
  return (
    <div style={{ marginTop: "20px" }}>
      {c && <C3 b={b} />}
      {d && <C2/>}
      <div className="mx-1">
        <button
          className="btn btn-primary px-3 mx-2"
          onClick={() => {
            setD(true)
          }}
        >
          Thêm người dùng
        </button>
      </div>
      <table id="customers" className="mt-3 mx-2 ">
        <tr>
          <th>Id</th>
          <th>email</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Thời gian đo</th>
          <th>Action</th>
        </tr>
        {a.map((a, b) => {
          return (
            <tr key={b}>
              <td>{a.id}</td>
              <td>{a.email}</td>
              <td>{a.firstName}</td>
              <td>{a.lastName}</td>
              <td>{a.createdAt}</td>
              <td>
                <button
                  onClick={() => {
                    setB(a);
                    setC(true);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    await axios.delete(
                      "http://localhost:8080/api/delete-user",
                      { data: { id: a.id } }
                    );
                    let A = await await axios.get(
                      "http://localhost:8080/api/get-all-users",
                      { params: { id: "ALL" } }
                    );
                    setA(A.data.users);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
export default C1;

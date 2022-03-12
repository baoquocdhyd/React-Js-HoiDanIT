import { useEffect, useState } from "react";
import axios from 'axios'
import moment from "moment";
// import moment from "moment-timezone";
const C1 = () => {
  const [a, setA] = useState([]);
	const F = async () => {
		const A = await axios.get('http://localhost:8080/api/get-all-users', {params:{id: 'ALL'}})
		// console.log(A) 
		setA(A.data.users)
	} 
  useEffect(() => {F()}, []);
  return (
    <div>
      <table id="customers" className="mt-3 mx-2 ">
        <tr>
          <th>email</th>
          <th>First name</th>
          <th>Action</th>
        </tr>
        {a.map((a,b) => {
          return (
            <tr key={b}>
              <td>{a.email}</td>
              <td>{a.firstName}</td>
              <td>
                <button>Add</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
export default C1;



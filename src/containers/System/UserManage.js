import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService.js";
import moment from "moment";
// import moment from "moment-timezone";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = { arrUsers: [] };
  }

  async componentDidMount() {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({ arrUsers: response.users });
      // console.log('kiểm tra 1',this.state.arrUsers);
    }
    // console.log(response)
  }

  render() {
    console.log("kiểm tra render", this.state.arrUsers);
    return (
      <div className="user-container">
        <div className="title text-center">Xin chào!</div>
        <div className="user-table">
          <table id="customers" className="mt-3 mx-2 ">
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Address</th>
              <th>Thời gian đo</th>
              <th>Actions</th>
            </tr>
            {this.state.arrUsers.map((a, b) => {
              return (
                <tr key={b}>
                  <td>{a.id}</td>
                  <td>{a.email}</td>
                  <td>{a.firstName}</td>
                  <td>{a.lastName}</td>
                  <td>{a.address}</td>
                  <td>{a.createdAt}</td>
                  <td>
                    <button>Add</button>
                    <button>Delete</button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

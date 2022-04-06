import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserSercice,
} from "../../services/userService.js";
import moment from "moment";
import ModalUser from "./ModalUser.js";
import ModalEditUser from "./ModalEditUser.js";
import { emitter } from "../../utils/emitter.js";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUserFromReact();
  }

  getAllUserFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({ arrUsers: response.users });
    }
  };
  handleAddNewUser = () => {
    this.setState({ isOpenModalUser: true });
  };
  toggleUserModal = () => {
    this.setState({ isOpenModalUser: !this.state.isOpenModalUser });
  };
  createNewUser = async (a) => {
    try {
      let response = await createNewUserService(a);
      // console.log("Response create user:", response);
      // alert(response.errMessage)
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
        this.setState({ isOpenModalUser: true });
      } else {
        await this.getAllUserFromReact();
        this.setState({ isOpenModalUser: false });
        emitter.emit("Xóa", { id: "your Id" });
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleDeleteUser = async (a) => {
    try {
      let res = await deleteUserService(a);
      if (res && res.errCode === 0) {
        await this.getAllUserFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleEditUser = (a) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: a,
    });
  };
  toggleUserEditModal = () => {
    this.setState({ isOpenModalEditUser: !this.state.isOpenModalEditUser });
  };

  doEditUser = async (user) => {
    try {
      let res = await editUserSercice(user);
      if (res && res.errCode === 0) {
        this.setState({ isOpenModalEditUser: false });
        await this.getAllUserFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    // console.log("kiểm tra render", this.state.arrUsers);
    return (
      <div className="user-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleUserEditModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}

        <div className="title text-center">Xin chào!</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3 mx-2"
            onClick={() => {
              this.handleAddNewUser();
            }}
          >
            Add new user
          </button>
        </div>
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
                    <button
                      onClick={() => {
                        this.handleEditUser(a);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        this.handleDeleteUser(a);
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

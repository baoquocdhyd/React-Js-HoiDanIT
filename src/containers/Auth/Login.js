import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService.js";
import { userLoginSuccess } from "../../store/actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      Show: true,
      message: "",
    };
  }
  handleOnChangeUsername = (e) => {
    this.setState({ Username: e.target.value });
    console.log(this.state.Username);
  };
  handleOnChangePassword = (e) => {
    this.setState({ Password: e.target.value });
    console.log(this.state.Password);
  };
  handleShowHidden = () => {
    this.setState({ Show: !this.state.Show });
    console.log(this.state.Show);
  };
  handleLogin = async () => {
    console.log(
      "Username: ",
      this.state.Username,
      "Password: ",
      this.state.Password
    );
    this.setState({ message: "" });

    try {
      let data = await handleLoginApi(this.state.Username, this.state.Password);
      if (data && data.errCode !== 0) {
        this.setState({ message: data.message });
      }
      if (data && data.errCode === 0) {
        // this.setState({ message: "Thành công rồi nhé" });
        this.props.userLoginSuccess(data.user)
        console.log("Thành công rồi nhé") 
      }
    } catch (e) {
      console.log(e.response.data.message);
      this.setState({ message: e.response.data.message });

      // console.log(this.state.message);
    }
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-center Form-Login">Form Login</div>
            <div className="col-md-12">
              <label for="Username" class="form-label ">
                Username
              </label>
              <input
                type="text"
                className="form-control "
                id="Username"
                name="Username"
                value={this.state.Username}
                onChange={(e) => {
                  this.handleOnChangeUsername(e);
                }}
              />
            </div>
            <label for="Password" class="form-label ">
              Password
            </label>
            <div className="col-12" style={{ display: "flex" }}>
              <div className="col-10">
                <input
                  type={!this.state.Show ? "text" : "password"}
                  className="form-control"
                  id="Password"
                  name="Password"
                  value={this.state.Password}
                  onChange={(e) => {
                    this.handleOnChangePassword(e);
                  }}
                />
              </div>
              <div className="col-2">
                <i
                  class={!this.state.Show ? "far fa-eye" : "far fa-eye-slash"}
                  onClick={() => {
                    this.setState({ Show: !this.state.Show });
                  }}
                ></i>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.message}
            </div>
            <div class="col-12">
              <button
                className=" col-12 btn btn-success"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Sign in
              </button>
            </div>
            <div className="col-12">
              <span>Quên Mật Khẩu</span>
            </div>

            <div className="col-12 text-center">Đăng nhập với:</div>
            <div>
              <i class="fab fa-google-plus-g icon-google"></i>
              <i class="fab fa-facebook-square icon-facebook"></i>
            </div>

            <div className="col-12">
              <div>
                <label class="btn btn-outline-primary" for="btncheck1">
                  Checkbox 1
                </label>

                <input
                  type="checkbox"
                  class=" form-check-input "
                  id="btncheck1"
                  autocomplete="off"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

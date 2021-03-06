import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {emitter} from '../../utils/emitter.js' 

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
    emitter.on('Xóa', (data) => {
      this.setState ( {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: data.id,
      })
  })
  }

  
  componentDidMount() {}


  toggle = () => {
    this.props.toggleFromParent();
  };
  handleOnChangeInput = (e, id) => {
    this.setState({ [id]: e.target.value });
  };
  checkValidateInput = () => {
    let isValid = true
    let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {isValid=false; alert('không có giá trị của '+ arrInput[i]) ; break;} 

    }; 
    return isValid
  };
  handleAddNewUser = () => {
    // console.log(this.state);
    let isValid = this.checkValidateInput()
    if (isValid) {this.props.createNewUser(this.state)} 
  };
  render() {
    // console.log(this.state)
    return (
      <Modal
        isOpen={this.props.isOpen}
        className={"modal-user-container"}
        onClick={() => this.props.toggleFromParent}
        size={"lg"}
        centered
      >
        <ModalHeader onClick={this.props.toggleFromParent}>
          Modal title
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="email"
                onChange={(e) => {
                  this.handleOnChangeInput(e, "email");
                }}
                value={this.state.email}
                name="email"
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => {
                  this.handleOnChangeInput(e, "password");
                }}
                value={this.state.password}
              />
            </div>
            <div className="input-container">
              <label>First Name</label>
              <input
                type="text"
                onChange={(e) => {
                  this.handleOnChangeInput(e, "firstName");
                }}
                value={this.state.firstName}
              />
            </div>
            <div className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                onChange={(e) => {
                  this.handleOnChangeInput(e, "lastName");
                }}
                value={this.state.lastName}
              />
            </div>
            <div className="input-container max-width-input">
              <label>Address</label>
              <input
                type="text"
                onChange={(e) => {
                  this.handleOnChangeInput(e, "address");
                }}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => {
              this.props.toggleFromParent(); 
              this.handleAddNewUser();
              
            }}
          >
            Add New
          </Button>
          <Button className="px-3" onClick={this.props.toggleFromParent}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);

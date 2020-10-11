import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LoginForm from "../forms/loginform";

class LoginContainer extends Component {
  state = {
    profileType: "",
  };

  setProfileType = (userType) => {
    this.setState(() => ({
      profileType: userType,
    }));
  };

  submitHandler = (userInfo) => {
    console.log(userInfo);
    this.loginRequest(userInfo);
  };

  loginRequest = (userInfo) => {
    const userType = this.state.profileType;
    let options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
      },
      body: JSON.stringify(userInfo),
    };
    fetch(`http://localhost:3000/${userType}login`, options)
      .then((resp) => resp.json())
      .then((user) => {
        console.log(user)
        this.props.setActiveUser(user, userType, user[userType].bids, user[userType].businesses);
        localStorage.setItem("token", user.jwt);
        this.props.history.push("/profile");
      });
  };

  render() {
    return (
      <div>
        <h2>Existing User Login</h2>
        <LoginForm
          submitHandler={this.submitHandler}
          setProfileType={this.setProfileType}
        />
        <br></br>
      </div>
    );
  }
}

export default withRouter(LoginContainer);

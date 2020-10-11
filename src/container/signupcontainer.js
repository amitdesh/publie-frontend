import React, { Component } from "react";
import { NavLink, Route, Switch, withRouter } from "react-router-dom";
import BuyerSignup from "../forms/sellersignup";
import SellerSignup from "../forms/buyersignup";

class SignupContainer extends Component {
  state = {
    profileType: "",
  };

  setProfileType = (type) => {
    this.setState(() => ({
      profileType: type,
    }));
  };

  submitHandler = (signupInfo) => {
    console.log(signupInfo);
    if (this.state.profileType === "buyer") {
      this.buyerSignupRequest(signupInfo);
    } else {
      this.sellerSignupRequest(signupInfo);
    }
  };

  buyerSignupRequest = (signupInfo) => {
    let options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
      },
      body: JSON.stringify({ buyer: signupInfo }),
    };
    console.log(this.state.profileType);
    fetch("http://localhost:3000/buyers", options)
      .then((resp) => resp.json())
      .then((user) => {
        this.props.setActiveUser(user, this.state.profileType);
        localStorage.setItem("token", user.jwt);
        this.props.history.push("/profile");
  })};

  sellerSignupRequest = (signupInfo) => {
    let options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
      },
      body: JSON.stringify({ seller: signupInfo }),
    };
    console.log(this.state.profileType);
    fetch("http://localhost:3000/sellers", options)
      .then((resp) => resp.json())
      .then((user) => {
        this.props.setActiveUser(user, this.state.profileType);
        localStorage.setItem("token", user.jwt);
        this.props.history.push("/profile");
  })
};

  render() {
    return (
      <div>
        <NavLink to="/signup/buyer">
          <button onClick={() => this.setProfileType("buyer")}>
            Sign-up as an Investor/Buyer
          </button>
          <br></br>
        </NavLink>
        <NavLink to="/signup/seller">
          <button onClick={() => this.setProfileType("seller")}>
            Sign-up as a Business Seller
          </button>
          <br></br>
        </NavLink>
        <Switch>
          <Route
            path="/signup/seller"
            render={() => (
              <BuyerSignup
                submitHandler={this.submitHandler}
                setProfileType={this.setProfileType}
              />
            )}
          />
          <Route
            path="/signup/buyer"
            render={() => (
              <SellerSignup
                submitHandler={this.submitHandler}
                setProfileType={this.setProfileType}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
export default withRouter(SignupContainer)

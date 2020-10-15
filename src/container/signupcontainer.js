import React, { Component } from "react";
import { NavLink, Route, Switch, withRouter } from "react-router-dom";
import BuyerSignup from "../forms/sellersignup";
import SellerSignup from "../forms/buyersignup";
import {Form, Button} from "react-bootstrap"
import "./signupcont.css"

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
    let buyerSignupInfo = new FormData()
    buyerSignupInfo.append("buyer[email_address]", signupInfo.email_address)
    buyerSignupInfo.append("buyer[password]", signupInfo.password)
    buyerSignupInfo.append("buyer[first_name]", signupInfo.first_name)
    buyerSignupInfo.append("buyer[last_name]", signupInfo.last_name)
    buyerSignupInfo.append("buyer[prof_pic]", signupInfo.prof_pic)
    buyerSignupInfo.append("buyer[profile_pic]", signupInfo.profile_pic)
    buyerSignupInfo.append("buyer[aum]", signupInfo.aum)
    buyerSignupInfo.append("buyer[industry]", signupInfo.industry)
    buyerSignupInfo.append("buyer[company_name]", signupInfo.company_name)
    let options = {
      method: "POST",
      body: buyerSignupInfo,
    };
    console.log(this.state.profileType);
    fetch("http://localhost:3000/buyers", options)
      .then((resp) => resp.json())
      .then((user) => {
        localStorage.setItem("token", user.jwt);
        this.props.setActiveUser(user, this.state.profileType);
        this.props.history.push("/profile");
  })};

  sellerSignupRequest = (signupInfo) => {
    let sellerSignupInfo = new FormData()
    sellerSignupInfo.append("seller[email_address]", signupInfo.email_address)
    sellerSignupInfo.append("seller[password]", signupInfo.password)
    sellerSignupInfo.append("seller[first_name]", signupInfo.first_name)
    sellerSignupInfo.append("seller[last_name]", signupInfo.last_name)
    sellerSignupInfo.append("seller[prof_pic]", signupInfo.prof_pic)
    sellerSignupInfo.append("seller[profile_picture]", signupInfo.profile_picture)
    let options = {
      method: "POST",
      body: sellerSignupInfo
    }
    fetch("http://localhost:3000/sellers", options)
      .then((resp) => resp.json())
      .then((user) => {
        console.log("User before loading to state", user)
        localStorage.setItem("token", user.jwt);
        this.props.setActiveUser(user, this.state.profileType);
        console.log("User after loading to state", user)
        this.props.history.push("/profile");
  })
};

  render() {
    return (
      <div className="form-div">
      <div className= "signup-container">
        <NavLink to="/signup/buyer">
          <Button className="signup-btns" variant="outline-primary" onClick={() => this.setProfileType("buyer")}>
            Sign-up as an Investor/Buyer
          </Button>
          <br></br>
        </NavLink>
        <NavLink to="/signup/seller">
          <Button className="signup-btns" variant="outline-primary" onClick={() => this.setProfileType("seller")}>
            Sign-up as a Business Seller
          </Button>
          <br></br>
        </NavLink>
      </div>
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

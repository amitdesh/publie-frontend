import React, { Component } from "react";

class SellerSignup extends Component {
  state = {
    email_address: "",
    password: "",
    first_name: "",
    last_name: "",
    prof_pic: "",
  };

  changeHandler = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  localSubmitHandler = (e) => {
    e.preventDefault();
    e.persist();
    this.props.submitHandler(this.state);
    this.setState(() => ({
      [e.target.name]: "",
    }));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.localSubmitHandler}>
          <label for="email_address">Email Address</label>
          <input
            type="text"
            name="email_address"
            value={this.state.email_address}
            placeholder="Enter username"
            onChange={this.changeHandler}
          />
          <br></br>
          <label for="password">Password</label>
          <input
            type="text"
            name="password"
            value={this.state.password}
            placeholder="Enter password"
            onChange={this.changeHandler}
          />
          <br></br>
          <label for="first_name">First Name</label>
          <input
            type="text"
            name="first_name"
            value={this.state.first_name}
            placeholder="Enter first name"
            onChange={this.changeHandler}
          />
          <br></br>
          <label for="last_name">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={this.state.last_name}
            placeholder="Enter last name"
            onChange={this.changeHandler}
          />
          <br></br>
          <label for="prof_pic">Profile Picture URL</label>
          <input
            type="text"
            name="prof_pic"
            value={this.state.prof_pic}
            placeholder="Enter profile picture image address"
            onChange={this.changeHandler}
          />
          <br></br>
          <button type="submit">Create New Seller Profile</button>
        </form>
      </div>
    );
  }
}

export default SellerSignup;

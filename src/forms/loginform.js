import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    email_address: "",
    password: "",
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
    console.log(e.target);
    this.props.submitHandler(this.state);
    this.setState(() => ({
      [e.target.name]: "",
    }));
  };

  localSetProfileType = (e) => {
    console.log(e.target.value);
    this.props.setProfileType(e.target.value);
  };

  render() {
    return (
      <div>
        <label for="profileType">I am a: </label>
        <select onChange={this.localSetProfileType}>
          <option value="seller">Business Seller</option>
          <option value="buyer">Buyer/Investor</option>
        </select>
        <br></br>
        <form onSubmit={this.localSubmitHandler}>
          <label for="email_address">Username (as Email Address)</label>
          <input
            type="text"
            name="email_address"
            placeholder="Enter username"
            value={this.state.email_address}
            onChange={this.changeHandler}
          />
          <br></br>
          <label for="password">Password: </label>
          <input
            type="text"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.changeHandler}
          />
          <br></br>
          <button type="submit">Log-In</button>
          <br></br>
        </form>
      </div>
    );
  }
}

export default LoginForm;

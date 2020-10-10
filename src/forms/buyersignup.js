import React, { Component } from "react";

class BuyerSignup extends Component {
  state = {
    email_address: "",
    password: "",
    first_name: "",
    last_name: "",
    company_name: "",
    aum: "",
    prof_pic: "",
    industry: "",
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
          <label for="email_address">Username (as Email Address)</label>
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
          <label for="company_name">Company Name</label>
          <input
            type="text"
            name="company_name"
            value={this.state.company_name}
            placeholder="Enter company name"
            onChange={this.changeHandler}
          />
          <br></br>
          <label for="aum">Assets Under Management</label>
          <input
            type="text"
            name="aum"
            value={this.state.aum}
            placeholder="Enter Company AUM"
            onChange={this.changeHandler}
          />
          <br></br>
          <label for="prof_pic">Profile Picture</label>
          <input
            type="text"
            name="prof_pic"
            value={this.state.prof_pic}
            placeholder="Enter profile picture image address"
            onChange={this.changeHandler}
          />
          <br></br>
          <label for="industry">Primary Industry of Interest</label>
          <select name="industry" onChange={this.changeHandler}>
            <option value="TMT">Technology/Media</option>
            <option value="CRG">Consumer/Retail</option>
            <option value="Business Services">Business Services</option>
            <option value="Industrials">Industrials</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Energy">Energy</option>
          </select>
          <br></br>
          <button type="submit">Create New Buyer/Investor Profile</button>
        </form>
      </div>
    );
  }
}

export default BuyerSignup;

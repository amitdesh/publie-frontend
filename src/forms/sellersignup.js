import React, { Component } from "react";
import {Form, Button} from "react-bootstrap"
import "./signupform.css"

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
      <span className="signup-form">
        <Form onSubmit={this.localSubmitHandler}>
        <Form.Group>
          <Form.Label>Username (as Email Address)</Form.Label>
          <Form.Control
            type="text"
            name="email_address"
            value={this.state.email_address}
            placeholder="Enter username"
            onChange={this.changeHandler}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            name="password"
            value={this.state.password}
            placeholder="Enter password"
            onChange={this.changeHandler}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={this.state.first_name}
            placeholder="Enter first name"
            onChange={this.changeHandler}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={this.state.last_name}
            placeholder="Enter last name"
            onChange={this.changeHandler}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Profile Picture URL</Form.Label>
          <Form.Control
            type="text"
            name="prof_pic"
            value={this.state.prof_pic}
            placeholder="Enter profile picture image address"
            onChange={this.changeHandler}
          />
          <br></br>
        </Form.Group>
          <Button variant="primary" type="submit">Create New Seller Profile</Button>
        </Form>
      </span>
    );
  }
}

export default SellerSignup;

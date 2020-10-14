import React, { Component } from "react";
import {Form, Button} from "react-bootstrap"

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
      <span className="login-form">
        <Form.Group>
        <Form.Label>I am a: </Form.Label>
        <Form.Control as="select" custom className="form" onChange={this.localSetProfileType}>
        <option value="">Choose One:</option>
          <option value="seller">Business Seller</option>
          <option value="buyer">Buyer/Investor</option>
        </Form.Control>
        <br></br>
        </Form.Group>
        <Form onSubmit={this.localSubmitHandler}>
        <Form.Group>
          <Form.Label>Username (as Email Address)</Form.Label>
          <Form.Control
            type="text"
            name="email_address"
            placeholder="Enter username"
            value={this.state.email_address}
            onChange={this.changeHandler}
          />
          </Form.Group>
          <Form.Group>
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="text"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.changeHandler}
          />
          <br></br>
          <Button variant="primary" type="submit">Log-In</Button>
        </Form.Group>
        </Form>
      </span>
    );
  }
}

export default LoginForm;

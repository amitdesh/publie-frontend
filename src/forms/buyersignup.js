import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import Dropzone from 'react-dropzone'
import "./signupform.css"

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
    profile_pic: null
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

  onDrop = (acceptedFiles) =>{
    this.setState({
      profile_pic: acceptedFiles[0]
    })
  }

  render() {
    return (
      <span>
        <Form onSubmit={this.localSubmitHandler} className="signup-form">
        <Form.Group>
          <Form.Label for="email_address">Username (as Email Address)</Form.Label>
          <Form.Control
            type="text"
            name="email_address"
            value={this.state.email_address}
            placeholder="Enter username"
            onChange={this.changeHandler}
          />
          </Form.Group>
          <Form.Group>

          <Form.Label for="password">Password</Form.Label>
          <Form.Control
            type="text"
            name="password"
            value={this.state.password}
            placeholder="Enter password"
            onChange={this.changeHandler}
          />
          </Form.Group>
          <Form.Group>

          <Form.Label for="first_name">First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={this.state.first_name}
            placeholder="Enter first name"
            onChange={this.changeHandler}
          />
          </Form.Group>
          <Form.Group>

          <Form.Label for="last_name">Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={this.state.last_name}
            placeholder="Enter last name"
            onChange={this.changeHandler}
          />
          </Form.Group>
          <Form.Group>

          <Form.Label for="company_name">Company Name</Form.Label>
          <Form.Control
            type="text"
            name="company_name"
            value={this.state.company_name}
            placeholder="Enter company name"
            onChange={this.changeHandler}
          />
          </Form.Group>
          <Form.Group>

          <Form.Label for="aum">Assets Under Management</Form.Label>
          <Form.Control
            type="text"
            name="aum"
            value={this.state.aum}
            placeholder="Enter Company AUM"
            onChange={this.changeHandler}
          />
          </Form.Group>
          <Form.Group>

          <Form.Label for="industry">Primary Industry of Interest</Form.Label>
          <Form.Control as="select" name="industry" onChange={this.changeHandler}>
            <option value= "">Choose One:</option>
            <option value="TMT">Technology/Media</option>
            <option value="CRG">Consumer/Retail</option>
            <option value="Business Services">Business Services</option>
            <option value="Industrials">Industrials</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Energy">Energy</option>
          </Form.Control>
          </Form.Group>
          <div className="profpic-upload">
          <Dropzone onDrop={this.onDrop} accept="image/png, image/gif,image/jpg,image/jpeg">
            {({getRootProps, getInputProps}) => (
              <div {...getRootProps()}>
									<input {...getInputProps()} />
								{this.state.profile_pic !== null ? "Profile Picture Uploaded" :
								"Click to here upload a profile picture" }
              </div>
            )}
        </Dropzone>
          </div>
        <br></br>
          <Button variant="primary" type="submit">Create New Buyer/Investor Profile</Button>
        </Form>
      </span>
    );
  }
}

export default BuyerSignup;

import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import Dropzone from 'react-dropzone'

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
      <span className="signup-form">
        <Form onSubmit={this.localSubmitHandler}>
        <Form.Group>

          <Form.Label for="email_address">Username (as Email Address)</Form.Label>
          <Form.Control
            type="text"
            name="email_address"
            value={this.state.email_address}
            placeholder="Enter username"
            onChange={this.changeHandler}
          />
          <Form.Label for="password">Password</Form.Label>
          <Form.Control
            type="text"
            name="password"
            value={this.state.password}
            placeholder="Enter password"
            onChange={this.changeHandler}
          />
          <Form.Label for="first_name">First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={this.state.first_name}
            placeholder="Enter first name"
            onChange={this.changeHandler}
          />
          <Form.Label for="last_name">Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={this.state.last_name}
            placeholder="Enter last name"
            onChange={this.changeHandler}
          />
          <Form.Label for="company_name">Company Name</Form.Label>
          <Form.Control
            type="text"
            name="company_name"
            value={this.state.company_name}
            placeholder="Enter company name"
            onChange={this.changeHandler}
          />
          <Form.Label for="aum">Assets Under Management</Form.Label>
          <Form.Control
            type="text"
            name="aum"
            value={this.state.aum}
            placeholder="Enter Company AUM"
            onChange={this.changeHandler}
          />
          <Form.Label for="prof_pic">Profile Picture</Form.Label>
          <Form.Control
            type="text"
            name="prof_pic"
            value={this.state.prof_pic}
            placeholder="Enter profile picture image address"
            onChange={this.changeHandler}
          />
          <br></br>
          <Dropzone onDrop={this.onDrop} accept="image/png, image/gif,image/jpg,image/jpeg" >
            {({getRootProps, getInputProps}) => (
              <div {...getRootProps()}>
									<input {...getInputProps()} />
								{this.state.profile_pic !== null ? "Profile Picture Uploaded" :
								"Click to here upload Profile Picture" }
              </div>
            )}
        </Dropzone>
        <br></br>
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
          <br></br>
          <Button variant="primary" type="submit">Create New Buyer/Investor Profile</Button>
        </Form.Group>
        </Form>
      </span>
    );
  }
}

export default BuyerSignup;

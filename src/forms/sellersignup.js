import React, { Component } from "react";
import {Form, Button} from "react-bootstrap"
import "./signupform.css"
import Dropzone from 'react-dropzone'

class SellerSignup extends Component {
  state = {
    email_address: "",
    password: "",
    first_name: "",
    last_name: "",
    prof_pic: "",
    profile_picture: null
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
      profile_picture: acceptedFiles[0]
    })
    console.log("Profile picture in state",this.state.profile_picture,"accepted files", acceptedFiles)
  }

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
          <Dropzone onDrop={this.onDrop} multiple accept="image/png, image/gif,image/jpg,image/jpeg" >
            {({getRootProps, getInputProps}) => (
              <div {...getRootProps()}>
									<input {...getInputProps()} />
								{this.state.profile_picture !== null ? "Profile Picture Uploaded" :
								"Click here to upload Profile Picture" }
              </div>
            )}
        </Dropzone>
        </Form.Group>
          <Button variant="primary" type="submit">Create New Seller Profile</Button>
        </Form>
      </span>
    );
  }
}

export default SellerSignup;

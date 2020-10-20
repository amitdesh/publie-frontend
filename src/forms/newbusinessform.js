import React, { Component } from "react";
import {withRouter} from "react-router-dom"
import Dropzone from 'react-dropzone'
import { Form, Button } from "react-bootstrap";

class NewBusinessForm extends Component {
  state = {
    name: "",
    location: "",
    industry: "",
    founder_name: "",
    biz_type: "",
    employees: "",
    revenue: "",
    description: "",
    biz_picture: null
  };

  changeHandler = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  submitHandler = (e) => {
    e.preventDefault()
    e.persist()
    this.bizSubmitHandler()
    this.setState(()=>({
      [e.target.name]: ""
    }))
  }

  onDrop = (acceptedFiles) =>{
    this.setState({
      biz_picture: acceptedFiles[0]
    })
  }

  bizSubmitHandler = () =>{
    let newBusinessFormData = new FormData()
    newBusinessFormData.append("business[name]", this.state.name)
    newBusinessFormData.append("business[location]", this.state.location)
    newBusinessFormData.append("business[industry]", this.state.industry)
    newBusinessFormData.append("business[founder_name]", this.state.founder_name)
    newBusinessFormData.append("business[biz_type]", this.state.biz_type)
    newBusinessFormData.append("business[employees]", this.state.employees)
    newBusinessFormData.append("business[revenue]", this.state.revenue)
    newBusinessFormData.append("business[description]", this.state.description)
    newBusinessFormData.append("business[biz_picture]", this.state.biz_picture)
    newBusinessFormData.append("business[seller_id]", this.props.profileData.activeUser.seller.id)
    const options = {
      method: "POST",
      // headers: {
      //   Authorization: `Bearer ${localStorage.token}`,
      // },
      body: newBusinessFormData
    }
    fetch("http://localhost:3000/businesses", options)
      .then((resp) => resp.json())
      .then((biz) => {
        this.props.addBiz(biz)
        this.props.history.push("/marketplace")
      });
  }

  render() {
    return (
      <span>
        <Form onSubmit= {this.submitHandler}>
          <Form.Group>
          <Form.Label for="name">Business Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Enter business name"
            onChange={this.changeHandler}
          />
          </Form.Group>
          <Form.Group>
          <Form.Label for="location">Business Location (HQ)</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={this.state.location}
            placeholder="Enter business HQ location"
            onChange={this.changeHandler}
          />
          </Form.Group>
          <Form.Group>
          <Form.Label for="industry">Industry</Form.Label>
          <Form.Control as="select" name="industry" onChange={this.changeHandler}>
            <option value="">Choose One:</option>
            <option value="Technology">Technology</option>
            <option value="Consumer-Retail">Consumer-Retail</option>
            <option value="Business Services">Business Services</option>
            <option value="Industrials">Industrials</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Energy">Energy</option>
          </Form.Control>
          </Form.Group>
          <Form.Group>
          <Form.Label for="founder_name">Founder/CEO Name</Form.Label>
          <Form.Control
            type="text"
            name="founder_name"
            value={this.state.founder_name}
            placeholder="Enter founder/CEO name"
            onChange={this.changeHandler}
          />
          </Form.Group>
          <Form.Group>
          <Form.Label for="biz_type">Type of Business</Form.Label>
          <Form.Control as="select" name="biz_type" onChange={this.changeHandler}>
            <option value= "">Choose One:</option>
            <option value="Self-Started">Self-Started</option>
            <option value="Family Business">Family Business</option>
            <option value="SME">SME</option>
            <option value="Investor-backed">Investor-backed</option>
            <option value="Institutional">Institutional</option>
          </Form.Control>
          </Form.Group>
          <Form.Group>
          <Form.Label for="employees">Number of Employees</Form.Label>
          <Form.Control
            type="number"
            name="employees"
            value={this.state.employees}
            placeholder="Enter number of employees"
            onChange={this.changeHandler}
          />
          </Form.Group>
          <Form.Group>
          <Form.Label for="revenue">Company Revenue ($ MM)</Form.Label>
          <Form.Control
            type="number"
            name="revenue"
            value={this.state.revenue}
            placeholder="Enter company revenue"
            onChange={this.changeHandler}
          />
          </Form.Group>
          <Form.Group>
          <Form.Label for="description">Business Description</Form.Label>
          <Form.Control as="textarea"
            type="text"
            name="description"
            value={this.state.description}
            placeholder="Enter business description"
            onChange={this.changeHandler}
          />
          </Form.Group>
          <Dropzone onDrop={this.onDrop} multiple accept="image/png, image/gif,image/jpg,image/jpeg" >
            {({getRootProps, getInputProps}) => (
              <div {...getRootProps()}>
									<input {...getInputProps()} />
								{this.state.biz_picture !== null ? "Business Pictures Uploaded" :
								"Click here to upload pictures of the Business" }
              </div>
            )}
        </Dropzone>
        <br></br>
          <Button variant="success" type="submit">Create New Business Posting</Button>
        </Form>
      </span>
    );
  }
}

export default withRouter(NewBusinessForm);

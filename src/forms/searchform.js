import React, { Component } from "react";
import { Form, Row, Col } from "react-bootstrap";
import "./searchform.css"

class SearchForm extends Component {



  render() {
    return (
      <div>
      <Form id="search-form">
      <Row>
      <Col>
      <Form.Group>
        <Form.Label for="searchTerm">Search words</Form.Label>
        <Form.Control name="searchTerm" placeholder="Enter keywords here" onChange={this.props.searchHandler} value={this.props.searchTerm}/>
      </Form.Group>
      </Col>
      <Col>
      <Form.Group>
        <Form.Label for="criteria"> By: </Form.Label>
        <Form.Control as="select" name="searchCrit" onChange={this.props.searchHandler} value={this.props.searchCrit}>
          <option value="industry">Industry</option>
          <option value="name" selected>Business Name</option>
          <option value="description">Business Description</option>
          <option value="founder_name">Founder/CEO Name</option>
        </Form.Control>
      </Form.Group>
      </Col>
        <br></br>
      </Row>
      </Form>
      </div>
    );
  }
}
export default SearchForm;

import React, { Component } from "react";
import { Card, Button, Tabs, Tab } from "react-bootstrap";
import {Route, withRouter, Switch } from "react-router-dom";
import BidForm from "../forms/bidform"
import BusinessProfile from "./businessprofile";
import "./businesstiles.css"

class BusinessTile extends Component {

  clickForProfile = (e) =>{
    e.preventDefault()
    e.persist()
    this.props.history.push(`/marketplace/${this.props.business.id}`)
  }

  clickForBid = (e) => {
    e.preventDefault()
    e.persist()
    this.props.history.push(`/marketplace/${this.props.business.id}/bid`)
  }

  showBidForm = () =>{
    
  }

  render() {
    return (
      <div>
        <div id="card-container">
        <Card border="primary" style={{width: '100%'}}>
          <Card.Img variant="top" src={this.props.business.biz_picture.url} alt="Image not found" />
          <Card.Body>
            <Card.Title>{this.props.business.name}</Card.Title>
            <Tabs defaultActiveKey="summary">
              <Tab eventKey="summary" title="Summary">
            <Card.Text>
            <br></br>
            <BusinessProfile business={this.props.business} profileData={this.props.profileData} addBid={this.props.addBid} />
            </Card.Text>
              </Tab>
              <Tab eventKey="description" title="Description">
              <br></br>
              <p>{this.props.business.description}</p>
              </Tab>
            {(this.props.profileData.userType === "buyer") ?
              <Tab eventKey="bid-form" title="Business Bid Form">
              <br></br>
              <BidForm profileData={this.props.profileData} business={this.props.business} addBid={this.props.addBid} />
              </Tab> : <br></br>}
            </Tabs>
            {/* <Button onClick={this.clickForProfile} variant="primary">View Business Profile</Button> */}
          </Card.Body>
        </Card>
        </div>
        <Switch>
        <Route exact
          path={`/marketplace/${this.props.business.id}/bid`}
          render={() => <BidForm profileData={this.props.profileData} business={this.props.business} addBid={this.props.addBid} />}
        />
        <Route
          path={`/marketplace/${this.props.business.id}`}
          render={() => <BusinessProfile business={this.props.business} profileData={this.props.profileData} addBid={this.props.addBid} />}
        />
        </Switch>
      </div>
    );
  }
}
export default withRouter(BusinessTile);

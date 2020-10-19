import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { NavLink, Route, withRouter, Switch } from "react-router-dom";
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
        <Card border="primary" style={{width: '25%'}}>
          <Card.Img variant="top" src={this.props.business.biz_picture.url} alt="Image not found" />
          <Card.Body>
            <Card.Title>{this.props.business.name}</Card.Title>
            <Card.Text>
            <h3>Founder: {this.props.business.founder_name}</h3>
            <h3>Industry: {this.props.business.industry}</h3>
            </Card.Text>
            <Button onClick={this.clickForProfile} variant="primary">View Business Profile</Button>
            {(this.props.profileData.userType === "buyer") ?
            <Button onClick={this.clickForBid} variant="info">Bid On Business</Button> : <span></span>}
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

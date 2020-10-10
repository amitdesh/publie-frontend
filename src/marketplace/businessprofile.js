import React, { Component } from "react";
import BidForm from "../forms/bidform";

class BusinessProfile extends Component {
  renderProfileInformation = ({
    name,
    location,
    industry,
    founder_name,
    biz_type,
    employees,
    revenue,
  }) => {
    return (
      <div>
        <h3>Name: {name}</h3>
        <h3>Location: {location}</h3>
        <h3>Industry: {industry}</h3>
        <h3>Founder: {founder_name}</h3>
        <h3>Business Type: {biz_type}</h3>
        <h3>Employees: {employees}</h3>
        <h3>Revenue: {revenue}</h3>
      </div>
    );
  };

  averageBidPrice = () => {
    let totalPrice = this.props.business.bids.reduce(
      (a, b) => a.bid_price + b.bid_price
    );
    let bidCount = this.props.business.bids.length;
    return totalPrice / bidCount;
  };

  renderActiveBids = () => {
    return (
      <div>
        <h2>Bid Detail</h2>
        <h3>Number of Bids: {this.props.business.bids.length}</h3>
        <h3>Average Bid Price: ${this.averageBidPrice()}</h3>
      </div>
    );
  };

  renderTransactions = () => {
    return (
      <div>
        <h2>Past Transaction Summary</h2>
        <h3>Placeholder for finalized transactions</h3>
      </div>
    );
  };

  renderBidForm = () => {
    if (this.props.user.profileType === "buyer") {
      return (
        <div>
          <BidForm />
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        {this.props.business === undefined ? (
          <h1>Loading</h1>
        ) : (
          <div>
            <div>{this.renderProfileInformation(this.props.business)}</div>
            <div>{this.renderBidForm()}</div>
            <div>{this.renderActiveBids()}</div>
            <div>{this.renderTransactions()}</div>
          </div>
        )}
      </div>
    );
  }
}
export default BusinessProfile;

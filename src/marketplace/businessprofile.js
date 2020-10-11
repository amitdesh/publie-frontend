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
        <h5>Name: {name}</h5>
        <h5>Location: {location}</h5>
        <h5>Industry: {industry}</h5>
        <h5>Founder: {founder_name}</h5>
        <h5>Business Type: {biz_type}</h5>
        <h5>Employees: {employees}</h5>
        <h5>Revenue: {revenue}</h5>
      </div>
    );
  };

  averageBidPrice = () => {
    let bidCount = this.props.business.bids.length;
    if (bidCount > 0){
      let totalPrice = this.props.business.bids.reduce(
        (b) => 0 + b.bid_price)
        return totalPrice / bidCount;
    } else {
      return 0
    }
  };

  renderActiveBids = () => {
    return (
      <div>
        <h3>Bid Detail</h3>
        <h4>Number of Bids: {this.props.business.bids.length}</h4>
        <h4>Average Bid Price: ${this.averageBidPrice()}</h4>
      </div>
    );
  };

  renderTransactions = () => {
    return (
      <div>
        <h3>Past Transaction Summary</h3>
        <h4>Placeholder for finalized transactions</h4>
      </div>
    );
  };

  renderBidForm = () => {
    console.log(this.props.profileData)
    if (this.props.profileData.userType === "buyer") {
      return (
        <div>
          <BidForm profileData={this.props.profileData} business={this.props.business} addBid={this.props.addBid} />
        </div>
      );
    }
  };

  render() {
    console.log(this.props.business.bids)
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

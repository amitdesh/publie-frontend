import React, { Component } from "react";

class BuyerProfile extends Component {
  renderBuyerProfile = () => {
    console.log(this.props.profileData);
    return (
      <div>
        <img src={this.props.profileData.prof_pic} alt="" />
        <h3>
          Name: {this.props.profileData.first_name}{" "}
          {this.props.profileData.last_name}
        </h3>
        <h3>Company Name: {this.props.profileData.company_name}</h3>
        <h3>AUM: {this.props.profileData.aum}</h3>
        <h3>Primary Industry of Interest: {this.props.profileData.industry}</h3>
        <h3>Email Address: {this.props.profileData.email_address}</h3>
      </div>
    );
  };

  renderBidSummary = () => {};

  renderTransactionSummary = () => {};

  render() {
    return (
      <div>
        <p>{this.renderBuyerProfile()}</p>
        <p>{this.renderBidSummary()}</p>
        <p>{this.renderTransactionSummary()}</p>
      </div>
    );
  }
}

export default BuyerProfile;

import React, { Component } from "react";

class SellerProfile extends Component {
  renderSellerProfile = () => {
    return (
      <div>
        <img src={this.props.profileData.prof_pic} alt="" />
        <h3>
          Name: {this.props.profileData.first_name}{" "}
          {this.props.profileData.last_name}
        </h3>
        <h3>Email Address: {this.props.profileData.email_address}</h3>
      </div>
    );
  };

  renderBidSummary = () => {};

  selectWinningBid = () => {};

  renderTransactionSummary = () => {};

  render() {
    return (
      <div>
        <p>{this.renderSellerProfile()}</p>
        <p>{this.renderBidSummary()}</p>
        <p>{this.renderTransactionSummary()}</p>
      </div>
    );
  }
}

export default SellerProfile;

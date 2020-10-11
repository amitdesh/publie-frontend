import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import NewBusinessForm from "../forms/newbusinessform"

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
        <NavLink to="/profile/newbusiness">
          <button>Upload a New Business</button>
        </NavLink>
        <Route path="/profile/newbusiness" render={()=> <NewBusinessForm profileData={this.props.profileData}/>} />
        <p>{this.renderBidSummary()}</p>
        <p>{this.renderTransactionSummary()}</p>
      </div>
    );
  }
}

export default SellerProfile;

import React, { Component } from "react";
import BuyerProfile from "../profiles/buyerprofile";
import SellerProfile from "../profiles/sellerprofile";

class ProfileContainer extends Component {
  
  render() {
    if (localStorage.token === ""){
      return <h1>Please log-in to see this page</h1>
    } else {
      if (this.props.allData.userType === "buyer") {
        return (
          <BuyerProfile profileData={this.props.allData} removeBid={this.props.removeBid} />
        );
      } else {
        return (
          <SellerProfile profileData={this.props.allData} removeBidSeller={this.props.removeBidSeller} removeBiz={this.props.removeBiz} addBiz={this.props.addBiz} addTxn={this.props.addTxn} />
        );
      }
    }
    }
}

export default ProfileContainer;

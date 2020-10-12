import React, { Component } from "react";
import BuyerProfile from "../profiles/buyerprofile";
import SellerProfile from "../profiles/sellerprofile";

class ProfileContainer extends Component {
  render() {
    console.log(this.props.userData);
    if (this.props.userData.userType === "buyer") {
      return (
        <BuyerProfile profileData={this.props.userData} removeBid={this.props.removeBid} />
      );
    } else {
      return (
        <SellerProfile profileData={this.props.userData} removeBidSeller={this.props.removeBidSeller} removeBiz={this.props.removeBiz} />
      );
    }
  }
}

export default ProfileContainer;

import React, { Component } from "react";
import BuyerProfile from "../profiles/buyerprofile";
import SellerProfile from "../profiles/sellerprofile";
import "./profilecont.css"

class ProfileContainer extends Component {
  
  render() {
    if (this.props.allData.activeUser === null){
      return (<div id="login-req">
      <h1 id="login-req">Please log-in to see this page</h1>
      </div>)
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

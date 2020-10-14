import React, { Component } from "react";
import BuyerProfile from "../profiles/buyerprofile";
import SellerProfile from "../profiles/sellerprofile";

class ProfileContainer extends Component {
  
  componentDidMount(){
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    };
    fetch("http://localhost:3000/bids", options)
      .then((resp) => resp.json())
      .then((bids) => {
        console.log(bids);
        this.props.setBids(bids)
      });

      const options2 = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          accepts: "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
      };
      fetch("http://localhost:3000/businesses", options2)
        .then((resp) => resp.json())
        .then((businesses) => {
          console.log("businesses from db", businesses);
          this.props.setBusinesses(businesses)
        });
  }
  
  
   
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
          <SellerProfile profileData={this.props.allData} removeBidSeller={this.props.removeBidSeller} removeBiz={this.props.removeBiz} />
        );
      }
    }
    }
}

export default ProfileContainer;

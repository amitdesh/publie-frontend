import React, { Component } from "react";
import BuyerProfile from "../profiles/buyerprofile";
import SellerProfile from "../profiles/sellerprofile";

class ProfileContainer extends Component {
  
  state = {
    allBiz: []
  }
  
  componentDidMount(){
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    };
    fetch("http://localhost:3000/businesses", options)
      .then((resp) => resp.json())
      .then((businesses) => {
        console.log("Fetched GET Businesses", businesses);
        this.setState(() => ({
          allBiz: businesses,
        }));
      });
  }
  
  
   
  render() {
    console.log(this.state.allBiz);
    if (localStorage.token === ""){
      return <h1>Please log-in to see this page</h1>
    } else {
      if (this.props.userData.userType === "buyer") {
        return (
          <BuyerProfile profileData={this.props.userData} removeBid={this.props.removeBid} />
        );
      } else {
        return (
          <SellerProfile profileData={this.props.userData} removeBidSeller={this.props.removeBidSeller} removeBiz={this.props.removeBiz} allBiz={this.state.allBiz} />
        );
      }
    }
    }
}

export default ProfileContainer;

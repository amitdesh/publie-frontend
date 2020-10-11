import React, { Component } from "react";

class BuyerProfile extends Component {

  state = {
    bids: [],
    businesses: []
  }
  renderBuyerProfile = () => {
    console.log(this.props.profileData);
    return (
      <div>
        <img src={this.props.profileData.activeUser.buyer.prof_pic} alt="" />
        <h3>
          Name: {this.props.profileData.activeUser.buyer.first_name}{" "}
          {this.props.profileData.activeUser.buyer.last_name}
        </h3>
        <h3>Company Name: {this.props.profileData.activeUser.buyer.company_name}</h3>
        <h3>AUM: {this.props.profileData.activeUser.buyer.aum}</h3>
        <h3>Primary Industry of Interest: {this.props.profileData.activeUser.buyer.industry}</h3>
        <h3>Email Address: {this.props.profileData.activeUser.buyer.email_address}</h3>
      </div>
    );
  };

  renderBidSummary = () => {
    // let businesses = this.props.profileData.businesses
    // let bids = this.props.profileData.bids
    let businesses = this.state.businesses
    let bids = this.state.bids
    let newArray = []
    for(let i=0; i<businesses.length; i++){
      let bidSum = {
        name:businesses[i].name,
        price: bids[i].bid_price,
        cash_consid: bids[i].cash_consid*100,
        closing_timeline: bids[i].closing_timeline
      }
      newArray.push(bidSum)
    }
    console.log(newArray)
    return newArray.map((bidSum) =>{
        return(
          <div>
          <h4>Business Name: {bidSum.name}</h4>
          <h4>Bid Price: ${bidSum.price}</h4>
          <h4>Cash Consideration: {bidSum.cash_consid}%</h4>
          <h4>Closing Timeline: {(bidSum.closing_timeline)} days</h4>
          </div>
        )
      })
  };

  componentDidMount(){
    this.setState(()=>({
      bids: this.props.profileData.bids,
      businesses: this.props.profileData.businesses
    }))
  }

  renderTransactionSummary = () => {
    return <h5>Placeholder for transactions</h5>
  };

  render() {
    console.log(this.props.profileData)
    return (
      <div>
        <p>{this.renderBuyerProfile()}</p>
        <h3>Active Bids</h3>
        <p>{this.renderBidSummary()}</p>
        <h3>Completed Transactions</h3>
        <p>{this.renderTransactionSummary()}</p>
      </div>
    );
  }
}

export default BuyerProfile;

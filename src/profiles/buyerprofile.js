import React, { Component } from "react";

class BuyerProfile extends Component {

  state = {
    bids: [],
    businesses: [],
    txns: []
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
    if (businesses.length >0){
    for(let i=0; i<businesses.length; i++){
      let bidSum = {
        name:businesses[i].name,
        price: bids[i].bid_price,
        cash_consid: bids[i].cash_consid*100,
        closing_timeline: bids[i].closing_timeline,
        winning_bid: bids[i].winning_bid,
        bid_id: bids[i].id,
        biz_id: businesses[i].id
      }
      newArray.push(bidSum)
    }
  }
    console.log(newArray)
    return newArray.map((bidSum) =>{
        return(
          <div>
          <h4>Business Name: {bidSum.name}</h4>
          <h4>Bid Price: ${bidSum.price}</h4>
          <h4>Cash Consideration: {bidSum.cash_consid}%</h4>
          <h4>Closing Timeline: {(bidSum.closing_timeline)} days</h4>
          <h4>Winning Bid: {bidSum.winning_bid}</h4>
          <button onClick={()=> this.localDeleteBidHandler(bidSum.bid_id, bidSum.biz_id)}>Delete Bid</button>
          </div>
        )
      })
  };

  localDeleteBidHandler = (bidID, bizID) =>{
    let options ={
      method: "DELETE",
      headers:{
        "content-type": "application/json",
        "accepts": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      }
    }
    fetch(`http://localhost:3000/bids/${bidID}`, options)
      .then((bid) => {
        console.log("this is the bid id and biz ID", bidID, bizID)
        this.props.removeBid(bidID, bizID)
        this.setState(()=>({
          bids: this.state.bids.filter(bids => bids.id !== bidID),
          businesses: this.state.businesses.filter(biz => biz.id !== bizID),
        }))
        // this.history.push("/marketplace")
      });
  }

  componentDidMount(){
    this.setState(()=>({
      bids: this.props.profileData.bids,
      businesses: this.props.profileData.businesses,
      txns: this.props.profileData.bids.filter(bid => bid.winning_bid)
    }))
  }

  renderTransactionSummary = () => {
    let businesses = this.state.businesses
    let txn = this.state.txns
    let newArray = []
    if(businesses.length > 0){
      for(let i=0; i<txn.length; i++){
        if (txn.business_id === businesses.id){
        let txnSum = {
          name:businesses[i].name,
          price: txn[i].bid_price,
          cash_consid: txn[i].cash_consid*100,
        };
        newArray.push(txnSum)
    }
    console.log("This is the transaction array", newArray)
  }
    return newArray.map((txnSum) =>{
        return(
          <div>
          <h4>Business Name: {txnSum.name}</h4>
          <h4>Bid Price: ${txnSum.price}</h4>
          <h4>Cash Consideration: {txnSum.cash_consid}%</h4>
          </div>
          )
          })
        }
      }

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

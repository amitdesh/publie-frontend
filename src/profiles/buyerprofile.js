import React, { Component } from "react";
import {withRouter } from "react-router-dom";

class BuyerProfile extends Component {

  state = {
    bids: [],
    businesses: [],
    txns: []
  }
  
  componentDidMount(){
    let userID = this.props.profileData.activeUser.buyer.id
    let businesses = this.props.profileData.businesses
    let assocBusinesses = []
    for (let i=0; i<businesses.length; i++){
      for (let j=0; j<businesses[i].bids.length; j++){
        if (businesses[i].bids[j].buyer_id === userID){
          assocBusinesses.push(businesses[i])
        }
      }
    }
    this.setState(()=>({
      bids: this.props.profileData.bids.filter(bid => bid.buyer_id === userID),
      businesses: assocBusinesses,
      txns: this.props.profileData.txns.filter(txn => txn.buyer_id === userID)
    }))
  }

  
  renderBuyerProfile = () => {
    let buyerProfile = this.props.profileData.activeUser.buyer;
    return (
      <div>
        <img src={buyerProfile.prof_pic} alt="" />
        <h3>
          Name: {buyerProfile.first_name}{" "}
          {buyerProfile.last_name}
        </h3>
        <h3>Company Name: {buyerProfile.company_name}</h3>
        <h3>AUM: {buyerProfile.aum}</h3>
        <h3>Primary Industry of Interest: {buyerProfile.industry}</h3>
        <h3>Email Address: {buyerProfile.email_address}</h3>
        <button onClick={this.logoutProfile}>Log-out</button>
        <button onClick={() => this.deleteProfile(buyerProfile.id)}>Delete Profile</button>
      </div>
    );
  };

  deleteProfile = (buyerID) =>{
    let options ={
      method: "DELETE",
      headers:{
        "content-type": "application/json",
        "accepts": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      }
    }
    fetch(`http://localhost:3000/sellers/${buyerID}`, options)
      .then((bid) => {
        this.props.history.push("/")
      });
  }

  logoutProfile = () =>{
    localStorage.setItem("token", "")
    this.props.history.push("/")
  }

  renderBidSummary = () => {
    let txns = this.state.txns
    let bids = this.state.bids
      if(bids.length >0){
    for (let i=0; i<txns.length; i++){
      return bids.map(bid => 
      {if (txns[i].bid_id !== bid.id){
          return(
            <div>
          <h4>Business Name: {bid.business.name}</h4>
          <h4>Bid Price: ${bid.bid_price}</h4>
          <h4>Cash Consideration: {bid.cash_consid *100}%</h4>
          {(bid.winning_bid) ? <span></span>:
          <button onClick={()=> this.localDeleteBidHandler(bid.id, bid.business_id)}>Delete Bid</button>} 
          </div>
        )
          }
      })
    }
    } 
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
        this.props.removeBid(bidID)
        this.setState(()=>({
          bids: this.state.bids.filter(bids => bids.id !== bidID),
          businesses: this.state.businesses.filter(biz => biz.id !== bizID),
        }))
      });
  }


  renderTransactionSummary = () => {
    console.log(this.state.txns)
    return this.state.txns.map(txn => {
      console.log(txn)
      return(
        <div>
        <h4>Business Name: {txn.business.name}</h4>
        <h4>Final Price: ${txn.bid.bid_price}</h4>
        <h4>Cash Consideration: {txn.bid.cash_consid *100}%</h4>
        </div>
      )
    })
  }

  render() {
    console.log(this.props.profileData)
    return (
      <div>
        <p>{this.renderBuyerProfile()}</p>
        <h3>Active Bids</h3>
        <p>{(this.state.bids.length >0) ? this.renderBidSummary() : <h5>No current active bids on the market.</h5>}</p>
        <h3>Completed Transactions</h3>
        <p>{(this.state.txns.length > 0) ? this.renderTransactionSummary(): <h4>You currently have currently no transactions completed.</h4>}</p>
      </div>
    );
  }
}

export default withRouter(BuyerProfile);

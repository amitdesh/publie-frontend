import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import NewBusinessForm from "../forms/newbusinessform"

class SellerProfile extends Component {

  state = {
    bids: [],
    businesses: [],
    txns: []
  }

  componentDidMount(){
    this.setState(()=>({
      bids: this.props.profileData.bids,
      businesses: this.props.profileData.businesses,
      txns: this.props.profileData.bids.filter(bid => bid.winning_bid)
    }))
  }


  renderSellerProfile = () => {
    return (
      <div>
        <img src={this.props.profileData.activeUser.seller.prof_pic} alt="" />
        <h3>
          Name: {this.props.profileData.activeUser.seller.first_name}{" "}
          {this.props.profileData.activeUser.seller.last_name}
        </h3>
        <h3>Email Address: {this.props.profileData.activeUser.seller.email_address}</h3>
      </div>
    );
  };

  renderBusinesses = () =>{
    return this.state.businesses.map(biz =>{return (
      <div>
        <h4>{biz.name}</h4>
        <button onClick={() => this.deleteBusiness(biz.id)}>Delete Business</button>
      </div>
    )})
  }

  deleteBusiness = (bizID) => {
    let options ={
      method: "DELETE",
      headers:{
        "content-type": "application/json",
        "accepts": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      }
    }
    fetch(`http://localhost:3000/businesses/${bizID}`, options)
      .then((bid) => {
        console.log("this is the bizID", bizID)
        this.props.removeBiz(bizID)
        this.setState(()=>({
          businesses: this.state.businesses.filter(bids => bids.id !== bizID)
        }))
        // this.history.push("/marketplace")
      });


  }

  renderBidSummary = () => {
    console.log("Bids", this.state.bids,"businesses", this.state.businesses)
    // let businesses = this.props.profileData.businesses
    // let bids = this.props.profileData.bids
    let businesses = this.state.businesses
    let bids = this.state.bids
    let newArray = []
    for(let i=0; i<bids.length; i++){
      if (bids.business_id === businesses.id){
      let bidSum = {
        name:businesses.name,
        price: bids[i].bid_price,
        cash_consid: bids[i].cash_consid*100,
        closing_timeline: bids[i].closing_timeline,
        bid_id: bids[i].id,
        biz_id: businesses[i].id,
        buyer_id: bids[i].buyer_id,
        winning_bid: bids[i].winning_bid
      }
      newArray.push(bidSum)
    }
    console.log(newArray)
  }
    return newArray.map((bidSum) =>{
        return(
          <div>
          <h4>Business Name: {bidSum.name}</h4>
          <h4>Bid Price: ${bidSum.price}</h4>
          <h4>Cash Consideration: {bidSum.cash_consid}%</h4>
          <h4>Closing Timeline: {(bidSum.closing_timeline)} days</h4>
          <h4>Winning Bid: {(bidSum.winning_bid) ? <h4>Yes</h4>: <h4>No</h4>}</h4>
          <button onClick={()=> this.localDeleteBidHandler(bidSum.bid_id)}>Delete Bid</button>
          <button onClick={()=> this.selectWinningBid(bidSum.bid_id)}>Accept Bid</button>
          </div>
        )
      })
  };

  localDeleteBidHandler = (bidID) =>{
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
        console.log("this is the bidID", bidID)
        this.props.removeBidSeller(bidID)
        this.setState(()=>({
          bids: this.state.bids.filter(bids => bids.id !== bidID)
        }))
        // this.history.push("/marketplace")
      });
  }

  selectWinningBid = (bidID) => {
    let options ={
      method: "PATCH",
      headers:{
        "content-type": "application/json",
        "accepts": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({winning_bid: true})
    }
    fetch(`http://localhost:3000/bids/${bidID}`, options)
    .then(resp => resp.json())
      .then(bid => {
        console.log("This is the updated bid", bid)
        let replaceBid = this.state.bids.find(bid => bid.id === bidID)
        replaceBid = bid
        this.setState(()=>({
          txns: [...this.state.txns, bid]
        }),()=> console.log(this.state.txns))
        
        // this.history.push("/marketplace")
      });
  };

  renderTransactionSummary = () => {
    let businesses = this.state.businesses
    let txn = this.state.txns
    let newArray = []
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
          </div>)
          })
          }

  render() {
    return (
      <div>
        <p>{this.renderSellerProfile()}</p>
        <NavLink to="/profile/newbusiness">
          <button>Upload a New Business</button>
        </NavLink>
        <Route path="/profile/newbusiness" render={()=> <NewBusinessForm profileData={this.props.profileData}/>} />
        <p>My Businesses</p>
        <p>{this.renderBusinesses()}</p>
        <p>My Bids</p>
        <p>{this.renderBidSummary()}</p>
        <p>Transactions Summary</p>
        <p>{this.renderTransactionSummary()}</p>
      </div>
    );
  }
}

export default SellerProfile;

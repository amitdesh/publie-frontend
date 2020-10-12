import React, { Component } from "react";
import { NavLink, Route, withRouter } from "react-router-dom";
import NewBusinessForm from "../forms/newbusinessform"

class SellerProfile extends Component {

  state = {
    bids: [],
    businesses: [],
    txns: [],
  }

  componentDidMount(){
    this.setState(()=>({
      bids: this.props.profileData.bids,
      businesses: this.props.profileData.businesses,
      txns: this.props.profileData.bids.filter(bid => bid.winning_bid),
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
        <button onClick={this.logoutProfile}>Log-out</button>
        <button onClick={() => this.deleteProfile(this.props.profileData.activeUser.seller.id)}>Delete Profile</button>
      </div>
    );
  };

  deleteProfile = (sellerID) =>{
    let options ={
      method: "DELETE",
      headers:{
        "content-type": "application/json",
        "accepts": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      }
    }
    fetch(`http://localhost:3000/sellers/${sellerID}`, options)
      .then((bid) => {
        this.props.history.push("/")
      });
  }

  logoutProfile = () =>{
    localStorage.setItem("token", "")
    this.props.history.push("/")
  }

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


  businessFetch = () => {
    let allBusinesses = this.props.allBiz
    console.log("Allbiz at the Seller profile level", allBusinesses)
    let userInfo = this.props.profileData.activeUser.seller
    let ownedBusinesses = allBusinesses.filter(biz => biz.seller_id === userInfo.id)
    console.log("Owned busiensses", ownedBusinesses)
    return ownedBusinesses.map((biz) => {
      return biz.bids.map(bid => {
        if(bid.winning_bid){
          return(
            <div>
            <h4>Business Name: {biz.name}</h4>
            <h4>Bid Price: ${bid.bid_price}</h4>
            <h4>Cash Consideration: {bid.cash_consid}%</h4>
            <h4>Closing Timeline: {(bid.closing_timeline)} days</h4>
            <h4>Winning Bid: {(bid.winning_bid) ? <h4>Yes</h4>: <h4>No</h4>}</h4>
            </div>
          )
        } else {
          return(
            <div>
            <h4>Business Name: {biz.name}</h4>
            <h4>Bid Price: ${bid.bid_price}</h4>
            <h4>Cash Consideration: {bid.cash_consid}%</h4>
            <h4>Closing Timeline: {(bid.closing_timeline)} days</h4>
            <h4>Winning Bid: {(bid.winning_bid) ? <h4>Yes</h4>: <h4>No</h4>}</h4>
            <button onClick={()=> this.localDeleteBidHandler(bid.id)}>Delete Bid</button>
            <button onClick={()=> this.selectWinningBid(bid.id)}>Accept Bid</button>
            </div>)
        }
      })
      })
    }
  

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
        let updatedBids = this.props.allBiz.filter(biz => biz.bids.id !== bidID)
        this.setState(()=>({
          bids: updatedBids
        }))
        this.props.history.push("/marketplace")
      });
  }

  selectWinningBid = (bidID) => {
    console.log("This is the txn bid id", bidID)
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
          txns: [...this.state.txns, bid],
          bids: this.state.bids.pop(bid)
        }),()=> console.log(this.state.txns, this.state.bids))
        this.props.history.push("/marketplace")
      });
  };



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
        <p>{this.businessFetch()}</p>
      </div>
    );
  }
}

export default withRouter(SellerProfile);

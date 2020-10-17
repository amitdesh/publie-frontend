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
      txns: this.props.profileData.txns
    }),()=> console.log("state in seller profile", this.state))
  }


  renderSellerProfile = () => {
    let sellerProfile = this.props.profileData.activeUser.seller
    return (
      <div>
        <img src={sellerProfile.prof_pic} alt="" />
        <img className="background-image" src={this.props.profileData.activeUser.picture} alt="background" />
        <h3>
          Name: {sellerProfile.first_name}{" "}
          {sellerProfile.last_name}
        </h3>
        <h3>Email Address: {sellerProfile.email_address}</h3>
        <button onClick={this.logoutProfile}>Log-out</button>
        <button onClick={() => this.deleteProfile(sellerProfile.id)}>Delete Profile</button>
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
    let userID = this.props.profileData.activeUser.seller.id
    let filteredBusinesses = this.props.profileData.businesses.filter(biz => biz.seller_id === userID)
    return filteredBusinesses.map(biz =>{return (
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
      .then((biz) => {
        let bids = this.state.bids
        for (let i=0; i<bids.length; i++){
          if(bids[i].business.id === bizID){
            this.localDeleteBidHandler(bids[i].business.id)
          }
        }
        this.props.removeBiz(bizID)
        this.setState(()=>({
          businesses: this.state.businesses.filter(biz => biz.id !== bizID),
          bids: this.state.bids.filter(bid => bid.business_id !== bizID)
        }))
        // this.history.push("/marketplace")
      });
  }

  

  renderBidSummary = () => {
    let bids = this.props.profileData.bids
    let userID = this.props.profileData.activeUser.seller.id
    let assocBids = []
    if(bids.length > 0){
    for (let i=0; i<bids.length; i++){
        if (bids[i].business.seller_id === userID){
          assocBids.push(bids[i])
        }}}
        // let filteredBids = assocBids.filter(bids => bids)
    return assocBids.map(bid => {
      return(
        <div>
        <h4>Business Name: {bid.business.name}</h4>
        <h4>Bid Price: ${bid.bid_price}</h4>
        <h4>Cash Consideration: {bid.cash_consid *100}%</h4>
        {(bid.winning_bid) ? <span></span>:
          <div>
        <button onClick={()=> this.localDeleteBidHandler(bid.id, bid.business_id)}>Delete Bid</button>
        <button onClick={()=> this.selectWinningBid(bid)}>Accept Bid</button>
          </div>
        }
        </div>
      )
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
        this.props.removeBidSeller(bidID)
        this.setState(()=>({
          bids: this.state.bids.filter(bid => bid.id !== bidID)
        }))
      });
  }

  selectWinningBid = (bid) => {
    let options ={
      method: "POST",
      headers:{
        "content-type": "application/json",
        "accepts": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        buyer_id: bid.buyer_id,
        seller_id: bid.business.seller_id,
        bid_id: bid.id,
        business_id: bid.business.id
      })
    }
    fetch(`http://localhost:3000/transactions/`, options)
    .then(resp => resp.json())
      .then(txn => {
        const index = this.state.bids.indexOf(bid)
        console.log("index of bid", index)
        this.props.addTxn(txn)
        this.setState(()=>({
          txns: [...this.state.txns, txn],
          bid: this.state.bids.splice(index, 1)
        }),()=> console.log("posted accepted bids", this.state.bids))
      });
  };

  renderTransactionSummary = () => {
    let userID = this.props.profileData.activeUser.seller.id
    let filteredTxns = this.props.profileData.txns.filter(txn => txn.seller_id === userID)
    return filteredTxns.map(txn => {
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
    console.log("currently listed businesses", this.state.businesses)
    return (
      <div>
        <p>{this.renderSellerProfile()}</p>
        <NavLink to="/profile/newbusiness">
          <button>Upload a New Business</button>
        </NavLink>
        <Route path="/profile/newbusiness" render={()=> <NewBusinessForm profileData={this.props.profileData} addBiz={this.props.addBiz}/>} />
        <p>My Businesses</p>
        <p>{(this.state.businesses) ? this.renderBusinesses(): <h4>You currently have no active business postings.</h4>}</p>
        <p>My Bids</p>
        <p>{(this.state.bids.length >0) ? this.renderBidSummary() : <h5>No current active bids for your business(es).</h5>}</p>
        <h3>Completed Transactions</h3>
        <p>{(this.state.txns.length > 0) ? <p>{this.renderTransactionSummary()}</p>: <h4>You currently have currently no transactions completed.</h4>}</p>
      </div>
    );
  }
}

export default withRouter(SellerProfile)

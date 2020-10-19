import React, { Component } from "react";
import { Button } from "react-bootstrap";
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
        <img className="background-image" src={this.props.profileData.activeUser.picture} alt="background" />
        <h3>
          Name: {sellerProfile.first_name}{" "}
          {sellerProfile.last_name}
        </h3>
        <h3>Email Address: {sellerProfile.email_address}</h3>
        <Button variant="info" onClick={this.logoutProfile}>Log-out</Button>
        <Button variant="warning" onClick={() => this.deleteProfile(sellerProfile.id)}>Delete Profile</Button>
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
        <Button variant="danger" onClick={() => this.deleteBusiness(biz.id)}>Delete Business</Button>
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

    console.log("buyer state", this.state)
    let userID = this.props.profileData.activeUser.seller.id
    let filteredTxns = this.props.profileData.txns.filter(txn => txn.seller_id === userID)
    let filteredBids = this.props.profileData.bids.filter(bid => bid.business.seller_id === userID)
    let txnIDs = filteredTxns.map(txn => txn.bid_id)
    let bidIDs = filteredBids.map(bid => bid.id)
    let renderIDs = bidIDs.filter(bidId => !txnIDs.includes(bidId))
    let renderBids = []
    for (let i = 0; i< renderIDs.length; i++){
      let x = filteredBids.find(el => el.id ===renderIDs[i])
      renderBids.push(x)
    }
    return renderBids.map(bid => {
      return(
        <div>
        <h4>Business Name: {bid.business.name}</h4>
        <h4>Bid Price: ${bid.bid_price}</h4>
        <h4>Cash Consideration: {bid.cash_consid *100}%</h4>
        {(bid.winning_bid) ? <span></span>:
          <div>
        <Button variant="danger" onClick={()=> this.localDeleteBidHandler(bid.id, bid.business_id)}>Delete Bid</Button>
        <Button variant="success" onClick={()=> this.selectWinningBid(bid)}>Accept Bid</Button>
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
          <Button variant="secondary">Upload a New Business</Button>
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

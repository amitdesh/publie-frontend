import React, { Component } from "react";
import {withRouter } from "react-router-dom";
import {Button} from "react-bootstrap"

class BuyerProfile extends Component {

  state = {
    bids: [],
    businesses: [],
    txns: []
  }
  
  componentDidMount(){
    this.setState(()=>({
      bids: this.props.profileData.bids,
      businesses: this.props.profileData.businesses,
      txns: this.props.profileData.txns
    }))
  }

  
  renderBuyerProfile = () => {
    let buyerProfile = this.props.profileData.activeUser.buyer;
    return (
      <div>
        <img className="profile-image" src={this.props.profileData.activeUser.picture} alt="background" />
        <h3>
          Name: {buyerProfile.first_name}{" "}
          {buyerProfile.last_name}
        </h3>
        <h3>Company Name: {buyerProfile.company_name}</h3>
        <h3>AUM: {buyerProfile.aum}</h3>
        <h3>Primary Industry of Interest: {buyerProfile.industry}</h3>
        <h3>Email Address: {buyerProfile.email_address}</h3>
        <span>
        <Button variant="info" onClick={this.logoutProfile}>Log-out</Button>
        <Button variant="warning" onClick={() => this.deleteProfile(buyerProfile.id)}>Delete Profile</Button>
        </span>
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
    console.log("buyer state", this.state)
    let userID = this.props.profileData.activeUser.buyer.id
    let filteredTxns = this.props.profileData.txns.filter(txn => txn.buyer_id === userID)
    let filteredBids = this.props.profileData.bids.filter(bid => bid.buyer_id === userID)
    let txnIDs = filteredTxns.map(txn => txn.bid_id)
    let bidIDs = filteredBids.map(bid => bid.id)
    let renderIDs = bidIDs.filter(bidId => !txnIDs.includes(bidId))
    console.log("render bid IDs", renderIDs)
    let renderBids = []
    for (let i = 0; i< renderIDs.length; i++){
      let x = filteredBids.find(el => el.id ===renderIDs[i])
      renderBids.push(x)
    }
    console.log("this is renderbids", renderBids)
        return renderBids.map(bid => {
          return(
          <div>
          <h4>Business Name: {bid.business.name}</h4>
          <h4>Bid Price: ${bid.bid_price}</h4>
          <h4>Cash Consideration: {bid.cash_consid *100}%</h4>
          {(bid.winning_bid) ? <span></span>:
          <Button variant="danger" onClick={()=> this.localDeleteBidHandler(bid.id, bid.business_id)}>Delete Bid</Button>} 
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
        this.props.removeBid(bidID)
        this.setState(()=>({
          bids: this.state.bids.filter(bids => bids.id !== bidID),
          businesses: this.state.businesses.filter(biz => biz.id !== bizID),
        }))
      });
  }


  renderTransactionSummary = () => {
    let userID = this.props.profileData.activeUser.buyer.id
    let filteredTxns = this.props.profileData.txns.filter(txn => txn.buyer_id === userID)
    return filteredTxns.map(txn => {
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

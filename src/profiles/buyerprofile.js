import React, { Component } from "react";
import {withRouter } from "react-router-dom";
import {Button, Table} from "react-bootstrap"
import "./profilepage.css"

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
      <div>
        <img className="prof-pic" src={this.props.profileData.activeUser.picture} alt="background" />
        <div class="divider"/>
      </div>
      <br></br>
      <div className= "profile-container">
        <h2>Profile Information</h2>
        <h4>
          Name: {buyerProfile.first_name}{" "}
          {buyerProfile.last_name}
        </h4>
        <h4>Company Name: {buyerProfile.company_name}</h4>
        <h4>Assets Under Management: ${this.thousandsSeparators(buyerProfile.aum)} MM</h4>
        <h4>Primary Industry of Interest: {buyerProfile.industry}</h4>
        <h4>Email Address: {buyerProfile.email_address}</h4>
        <Button variant="info" onClick={this.logoutProfile}>Log-out</Button>
        <div class="divider"/>
        <Button variant="warning" onClick={() => this.deleteProfile(buyerProfile.id)}>Delete Profile</Button>
      </div>
      </div>
    );
  };

  thousandsSeparators = (num) => {
    let num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

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
          <tr>
          <td>{bid.business.name}</td>
          <td>${this.thousandsSeparators(bid.bid_price)}</td>
          <td>{bid.cash_consid *100}%</td>
          <td><Button variant="danger" onClick={()=> this.localDeleteBidHandler(bid.id, bid.business_id)}>Delete Bid</Button></td>
          </tr>
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
        <tr>
        <td>{txn.business.name}</td>
        <td>${this.thousandsSeparators(txn.bid.bid_price)}</td>
        <td>{txn.bid.cash_consid *100}%</td>
        </tr>
      )
    })
  }

  render() {
    console.log(this.props.profileData)
    return (
      <div className ="main-container">
        {this.renderBuyerProfile()}
        <div class="divider"/>
        <div className= "profile-container">
        <Table>
        <thead>
          <tr>
        <h2>My Bids</h2>
          </tr>
          <tr>
          <th>
            Business Name
          </th>
          <th>
            Bid Price ($ MM)
          </th>
          <th>
            Cash Consideration (%)
          </th>
           <th>
            Delete Bid
          </th>
          </tr>
        </thead>
        <tbody>
        {(this.state.bids.length >0) ? this.renderBidSummary() : <h5>No active bids placed.</h5>}
        </tbody>
        <div class="divider"/>
        </Table>
        </div>
        <div class="divider"/>
        <div className= "profile-container">
        <Table>
        <thead>
          <tr>
        <h2>My Transactions</h2>
          </tr>
          <tr>
          <th>
            Business Name
          </th>
          <th>
            Bid Price($ MM)
          </th>
          <th>
            Cash Consideration (%)
          </th>
          </tr>
        </thead>
        <tbody>
        {(this.state.txns.length > 0) ? this.renderTransactionSummary() : <h5>No transactions completed.</h5>}
        </tbody>
        </Table>
        </div>
        <div class="divider"/>
      </div>
    );
  }
}

export default withRouter(BuyerProfile);

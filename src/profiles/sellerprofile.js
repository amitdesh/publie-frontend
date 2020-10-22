import React, { Component } from "react";
import { Button, Table, Tabs, Tab } from "react-bootstrap";
import { NavLink, withRouter } from "react-router-dom";
import NewBusinessForm from "../forms/newbusinessform"
import "./profilepage.css"

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
    }))
  }


  renderSellerProfile = () => {
    let sellerProfile = this.props.profileData.activeUser.seller
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
          Name: {sellerProfile.first_name}{" "}
          {sellerProfile.last_name}
        </h4>
        <h4>Email Address: {sellerProfile.email_address}</h4>
        <Button variant="info" onClick={this.logoutProfile}>Log-out</Button>
        <div class="divider"/>
        <Button variant="warning" onClick={() => this.deleteProfile(sellerProfile.id)}>Delete Profile</Button>
        </div>
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
      <tr>
        <td>{biz.name}</td>
        <td>{biz.industry}</td>
        <td><Button variant="danger" onClick={() => this.deleteBusiness(biz.id)}>Delete Business</Button></td>
      </tr>
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
        <tr>
        <td>{bid.business.name}</td>
        <td>${this.thousandsSeparators(bid.bid_price)}</td>
        <td>{bid.cash_consid *100}%</td>
        <td><Button variant="success" onClick={()=> this.selectWinningBid(bid)}>Accept Bid</Button></td>
        <td><Button variant="danger" onClick={()=> this.localDeleteBidHandler(bid.id, bid.business_id)}>Delete Bid</Button></td>
        </tr>
      )}
      )
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
        <tr>
        <td>{txn.business.name}</td>
        <td>${this.thousandsSeparators(txn.bid.bid_price)}</td>
        <td>{txn.bid.cash_consid *100}%</td>
        </tr>
      )
    })
  }

  thousandsSeparators = (num) => {
    let num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }



  render() {
    console.log("currently listed businesses", this.state.businesses)
    return (
      <div className ="main-container">
        {this.renderSellerProfile()}
        <div class="divider"/>
        <div className= "profile-container">
        <Tabs defaultActiveKey="mybusinesses">
          <Tab eventKey="mybusinesses" title="My Businesses">
        <Table>
        <thead>
        <tr>
        <br></br>
        <h2>My Businesses</h2>
        </tr>
        <div class="divider"/>
        <tr>
          <th>
            Business Name
          </th>
          <th>
            Industry
          </th>
          <th>
            Action
          </th>
        </tr>
        </thead>
        <tbody>
        {(this.state.businesses) ? this.renderBusinesses(): <h5>No active business postings.</h5>}
        </tbody>
        <div class="divider"/>
        </Table>
          </Tab>
          <Tab eventKey="new-business" title="Upload New Business">
          <NewBusinessForm profileData={this.props.profileData} addBiz={this.props.addBiz}/>
          </Tab>
        </Tabs>
        </div>
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
            Accept Bid
          </th>
          <th>
            Delete Bid
          </th>
          </tr>
        </thead>
        <tbody>
        {(this.state.bids.length >0) ? this.renderBidSummary() : <h5>No active bids for your business(es).</h5>}
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

export default withRouter(SellerProfile)

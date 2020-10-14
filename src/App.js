import React from "react";
import { Switch, Route, NavLink, withRouter } from "react-router-dom";
import "./App.css";
import LoginContainer from "./container/logincontainer";
import SignupContainer from "./container/signupcontainer";
import MarketplaceContainer from "./container/marketplacecontainer";
import ProfileContainer from "./container/profilecontainer";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from "react-bootstrap";

class App extends React.Component {
  state = {
    activeUser: null,
    userType: "",
    bids: [],
    businesses: [],
    txns: []
  };

  renderInfo = () => {
    this.getBusinesses()
    this.getBids()
    this.getTransactions()
  }

  getBusinesses = () =>{
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    };
    fetch("http://localhost:3000/businesses", options)
      .then((resp) => resp.json())
      .then((businesses) => {
        this.setState(()=>({
          businesses: businesses
        }))
      });
  }

  getBids = () =>{
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    };
    fetch("http://localhost:3000/bids", options)
      .then((resp) => resp.json())
      .then((bids) => {
        this.setState(()=>({
          bids: bids
        }))
      });
  }

  getTransactions = () =>{
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    };
    fetch("http://localhost:3000/transactions", options)
      .then((resp) => resp.json())
      .then((txns) => {
        this.setState(()=>({
          txns: txns
        }))
      });
  }

  setActiveUser = (profileCreds, profileType) => {
    this.setState(() => ({
      activeUser: profileCreds,
      userType: profileType,
    }),()=> this.renderInfo());
  };

  setBusinesses = (businesses) =>{
    this.setState(() => ({
      businesses: businesses
    }));
  }

  setBids = (bids) => {
    this.setState(() => ({
      bids: bids
    }));
  }

  addBids = (bidInfo, businessInfo) => {
    this.setState(()=>({
      bids: [...this.state.bids, bidInfo],
      businesses: [...this.state.businesses, businessInfo]
    }), console.log(this.state.bids))
  }

  removeBid = (bidID) =>{
    this.setState(()=>({
      bids: this.state.bids.filter(bids => bids.id !== bidID),
    }))
  }

  removeBidSeller = (bidID) =>{
    this.setState(()=>({
      bids: this.state.bids.filter(bids => bids.id !== bidID),
    }))
  }

  addBiz = (biz) =>{
    this.setState(()=>({
      businesses: [...this.state.businesses, biz]
    }))
  }

  removeBiz = (bizID) =>{
    this.setState(()=>({
      bids: this.state.bids.filter(bid => bid.business_id !== bizID),
      businesses: this.state.businesses.filter(biz => biz.id !== bizID),
    }))
  }

  addTxn = (txn) =>{
    this.setState(()=>({
      txns: [...this.state.txns, txn]
    }))
  }

  render() {
    return (
      <div className="home">
      <span id="nav-bar">
        <h1 id="website-title">Welcome to the DealMaker Marketplace</h1>
      <span className="container">
        <NavLink to="/login">
          <Button variant="secondary" className="nav-button">Log-in</Button>
          <br></br>
        </NavLink>
        <NavLink to="/signup">
          <Button variant="secondary" className="nav-button">Sign-up</Button>
          <br></br>
        </NavLink>
        <NavLink to="/marketplace">
          <Button variant="secondary" className="nav-button">Marketplace</Button>
          <br></br>
        </NavLink>
        <NavLink to="/profile">
          <Button variant="secondary" className="nav-button">My Profile</Button>
          <br></br>
        </NavLink>
      </span>
        <Switch>
          <Route
            path="/login"
            render={() => <LoginContainer setActiveUser={this.setActiveUser} />}
          />
          <Route
            path="/signup"
            render={() => (
              <SignupContainer setActiveUser={this.setActiveUser} />
            )}
          />
          <Route
            path="/profile"
            render={() => (
              <ProfileContainer
                allData={this.state}
                removeBid={this.removeBid}
                removeBidSeller={this.removeBidSeller}
                removeBiz={this.removeBiz}
                setBids={this.setBids}
                setBusinesses={this.setBusinesses}
                addBiz={this.addBiz}
                addTxn={this.addTxn}
              />
            )}
          />
          <Route
            path="/marketplace"
            render={() => (
              <MarketplaceContainer
                allData={this.state}
                setBusinesses={this.setBusinesses}
                addBid={this.addBids}
              />
            )}
          />
        </Switch>
      </span>
      </div>
    );
  }
}

export default withRouter(App);

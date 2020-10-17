import { render } from "@testing-library/react";
import React, { Component } from "react";
import {withRouter} from "react-router-dom"

class BidForm extends Component {
  state = {
    bid_price: "",
    closing_timeline: "",
    cash_consid: "",
    eq_consid: "",
    winning_bid: false,
  };

  changeHandler = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  submitHandler = (e) => {
    e.preventDefault()
    e.persist()
    this.bidSubmitHandler()
    this.setState(()=>({
      [e.target.name]: ""
    }))
  }

  bidSubmitHandler = () =>{
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({
        buyer_id: this.props.profileData.activeUser.buyer.id,
        business_id: this.props.business.id,
        bid_price: this.state.bid_price,
        closing_timeline: this.state.closing_timeline,
        cash_consid: this.state.cash_consid,
        eq_consid: this.state.eq_consid,
        winning_bid: false,
        })};
    fetch("http://localhost:3000/bids", options)
      .then((resp) => resp.json())
      .then((bid) => {
        console.log("submitted bid", bid)
        this.props.addBid(bid.bid, this.props.business)
        this.props.history.push("/profile")
      });
  }


  render() {
    console.log(this.props.profileData.activeUser)
    return (
      <form onSubmit={this.submitHandler}>
        <label for="price">Total Purchase Price</label>
        <input
          type="text"
          name="bid_price"
          placeholder="Enter total purchase consideration"
          value={this.state.price}
          onChange={this.changeHandler}
        />
        <br></br>
        <label for="closing">Deal Closing Timeline (in days)</label>
        <input
          type="number"
          name="closing_timeline"
          placeholder="Enter closing timeline (in days)"
          value={this.state.closing}
          onChange={this.changeHandler}
        />
        <br></br>
        <label for="cash_consid">Total Purchase Consideration in Cash</label>
        <input
          type="number"
          name="cash_consid"
          placeholder="Total cash consideration"
          value={this.state.cash_consid}
          onChange={this.changeHandler}
        />
        <br></br>
        <label for="eq_consid">Total Purchase Consideration in Eq</label>
        <input
          type="number"
          name="eq_consid"
          placeholder="Total equity consideration"
          value={this.state.eq_consid}
          onChange={this.changeHandler}
        />
        <button type="submit">Submit Bid for Business</button>
      </form>
    );
  }
}
export default withRouter(BidForm);

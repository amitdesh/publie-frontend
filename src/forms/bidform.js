import { render } from "@testing-library/react";
import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
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
    console.log("state in bid form", this.state, "state of user", this.props.activeUser)
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

  closeModal = (e) =>{
    console.log(e.target.show)
    e.target.show = !e.target.show
  }


  render() {
    console.log(this.props.profileData.activeUser)
    return (
      <span>
      <Form onSubmit={this.submitHandler}>
        <Form.Group>

        <Form.Label for="price">Total Purchase Price ($ MM)</Form.Label>
        <Form.Control
          type="text"
          name="bid_price"
          placeholder="Enter total purchase consideration"
          value={this.state.price}
          onChange={this.changeHandler}
        />
        </Form.Group>
        <Form.Group>
        <Form.Label for="closing">Deal Closing Timeline (in days)</Form.Label>
        <Form.Control
          type="number"
          name="closing_timeline"
          placeholder="Enter closing timeline (in days)"
          value={this.state.closing}
          onChange={this.changeHandler}
        />
        </Form.Group>
        <Form.Group>
        <Form.Label for="cash_consid">Total Purchase Consideration in Cash (%)</Form.Label>
        <Form.Control
          type="number"
          name="cash_consid"
          placeholder="Total cash consideration"
          value={this.state.cash_consid}
          onChange={this.changeHandler}
        />
        </Form.Group>
        <Form.Group>
        <Form.Label for="eq_consid">Total Purchase Consideration in Equity (%)</Form.Label>
        <Form.Control
          type="number"
          name="eq_consid"
          placeholder="Total equity consideration"
          value={this.state.eq_consid}
          onChange={this.changeHandler}
        />
        <br></br>
        <Button variant="success" type="submit">Submit Bid for Business</Button>
        </Form.Group>
      </Form>
      </span>
    );
  }
}
export default withRouter(BidForm);

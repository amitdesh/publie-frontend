import { render } from "@testing-library/react";
import React, { Component } from "react";

class BidForm extends Component {
  state = {
    price: "",
    closing: "",
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
  render() {
    return (
      <form>
        <label for="price">Total Purchase Price</label>
        <input
          type="text"
          name="price"
          placeholder="Enter total purchase consideration"
          value={this.state.price}
          onChange={this.changeHandler}
        />
        <br></br>
        <label for="closing">Deal Closing Timeline (in days)</label>
        <input
          type="number"
          name="closing"
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
export default BidForm;

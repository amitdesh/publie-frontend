import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import BusinessProfile from "./businessprofile";

class BusinessTile extends Component {
  summaryFunctions = () => {
    // let businessSeller_id = this.props.business.seller_id;
    // let currentSeller_id = this.props.user.id;
    // console.log(this.props.business.seller_id);
    // if (businessSeller_id === currentSeller_id) {
    return (
      <div>
        <button>Edit Listing</button>
        <button>Delete Listing</button>
      </div>
    );
  };

  render() {
    return (
      <div>
        <NavLink to={`/marketplace/${this.props.business.id}`}>
          <h3>{this.props.business.name}</h3>
        </NavLink>
        <Route
          path={`/marketplace/${this.props.business.id}`}
          render={() => <BusinessProfile />}
        />
        <div>
          <h3>Name: {this.props.business.name}</h3>
          <h3>Founder: {this.props.business.founder_name}</h3>
          <h3>Industry: {this.props.business.industry}</h3>
        </div>
        {this.summaryFunctions()}
      </div>
    );
  }
}
export default BusinessTile;

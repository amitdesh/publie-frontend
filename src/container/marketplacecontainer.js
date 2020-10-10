import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import SearchForm from "../forms/searchform";
import BusinessProfile from "../marketplace/businessprofile";
import BusinessTile from "../marketplace/businesstiles";

class MarketplaceContainer extends Component {
  state = {
    businessTiles: [],
  };

  componentDidMount() {
    let token = this.props.userData.activeUser.jwt;
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch("http://localhost:3000/businesses", options)
      .then((resp) => resp.json())
      .then((businesses) => {
        console.log(businesses);
        this.setState(() => ({
          businessTiles: businesses,
        }));
      });
  }

  renderBusinessTiles = () => {
    console.log(this.state.businessTiles);
    return this.state.businessTiles.map((business) => {
      return <BusinessTile key={business.id} business={business} />;
    });
  };

  render() {
    return (
      <div>
        <SearchForm />
        <h1>{this.renderBusinessTiles()}</h1>
        <Switch>
          <Route
            path="/marketplace/:id"
            render={({ match }) => {
              let id = parseInt(match.params.id, 10);
              let foundBusiness = this.state.businessTiles.find(
                (business) => business.id === id
              );
              console.log("Found business:", foundBusiness);
              return <BusinessProfile business={foundBusiness} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}
export default withRouter(MarketplaceContainer);

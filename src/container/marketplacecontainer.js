import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import SearchForm from "../forms/searchform";
import BusinessProfile from "../marketplace/businessprofile";
import BusinessTile from "../marketplace/businesstiles";

class MarketplaceContainer extends Component {
  state = {
    searchTerm: "",
    searchCrit: "name"
  };

  changeHandler=(e) =>{
    e.persist()
    this.setState(()=>({
      [e.target.name]: e.target.value
    }))
  }

  componentDidMount(){
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
        console.log("businesses from db", businesses);
        this.props.setBusinesses(businesses)
      });
  }

  renderBusinessTiles = () => {
    let businesses = this.props.allData.businesses
    let criteria = this.state.searchCrit.toLowerCase()
    let searchWords = this.state.searchTerm.toLowerCase()
    let filteredBiz = businesses.filter((biz) => biz[criteria].toLowerCase().includes(searchWords))     
    return filteredBiz.map((business) => {
      return <BusinessTile key={business.id} business={business} profileData={this.props.allData} addBid={this.props.addBid} />;
    });
  };

  render() {
  if (localStorage.token === ""){return <h1>Please log-in to see this page</h1>} else { 
    return (
      <div>
        <SearchForm searchHandler={this.changeHandler} searchTerm={this.state.searchTerm} searchCrit={this.state.searchCrit} />
        <h1>{this.renderBusinessTiles()}</h1>
      </div>
    );
  }
}
}
export default withRouter(MarketplaceContainer);

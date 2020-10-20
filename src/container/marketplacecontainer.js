import React, { Component } from "react";
import {withRouter } from "react-router-dom";
import SearchForm from "../forms/searchform";
import BusinessTile from "../marketplace/businesstiles";
import {CardDeck} from "react-bootstrap"

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

  renderBusinessTiles = () => {
    let businesses = this.props.allData.businesses
    console.log("businesses in marketplace", businesses)
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
        <br></br>
        <CardDeck>
        {this.renderBusinessTiles()}
        </CardDeck>
      </div>
    );
  }
}
}
export default withRouter(MarketplaceContainer);

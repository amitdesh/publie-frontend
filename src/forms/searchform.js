import React, { Component } from "react";

class SearchForm extends Component {



  render() {
    return (
      <div>
        <label for="searchTerm">Search words: </label>
        <input name="searchTerm" placeholder="Enter keywords here" onChange={this.props.searchHandler} value={this.props.searchTerm}/>
        <label for="criteria"> By: </label>
        <select name="searchCrit" onChange={this.props.searchHandler} value={this.props.searchCrit}>
          <option value="industry">Industry</option>
          <option value="name" selected>Business Name</option>
          <option value="description">Business Description</option>
          <option value="founder_name">Founder/CEO Name</option>
        </select>
        <br></br>
      </div>
    );
  }
}
export default SearchForm;

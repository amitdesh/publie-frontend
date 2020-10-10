import React, { Component } from "react";

class SearchForm extends Component {
  state = {};

  render() {
    return (
      <div>
        <label for="searchTerm">Search words: </label>
        <input name="searchTerm" placeholder="Enter keywords here" />
        <label for="criteria"> By: </label>
        <select name="criteria">
          <option value="industry">Industry</option>
          <option value="name">Business Name</option>
          <option value="description">Business Description</option>
          <option value="founder_name">Founder/CEO Name</option>
        </select>
        <br></br>
        <label for="criteria"> Sort-By: </label>
        <select name="sort-type">
          <option value="">None</option>
          <option value="revenue">Revenue</option>
          <option value="employees">Employees</option>
          <option value="bid-count">Popularity</option>
        </select>
        <br></br>
        <label for="criteria"> Order-By: </label>
        <select name="sort-fn">
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
    );
  }
}
export default SearchForm;

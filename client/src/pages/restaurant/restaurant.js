import React, { Component } from 'react';
import './restaurant.scss';
import axios from 'axios';
import NavBar from "../../components/navbar/navbar";


class Restaurant extends React.Component {
  render() {
    return (
      <div id="restaurant_outer">
        <NavBar />
        <ContactForm />
      </div>
    )
  }
}


class ContactForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: '',
      keyword: '',
      category: 0,
      open_now: false,
      sort_idx: 0,
      category_map: ['', 'african', 'tradamerican', 'arabian', 'asianfusion', 'baguettes', 'bbq', 'bistros', 'breakfast_brunch', 'burgers', 'cafes', 'chinese', 'hotdogs', 'indpak', 'italian', 'japanese', 'korean', 'mediterranean', 'mexican', 'pizza', 'salad', 'sandwiches', 'thai', 'vegetarian'],
      sort_map: ['', 'rating', 'review_count', 'distance']
    };

    this.handleChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log('Change detected. State updated' + name + ' = ' + value);
  }

  handleSubmit(event) {
    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search`, {
      headers: {
        'Authorization': `Bearer ITSKhNoa4exeX_bVQ5_3q44kTeAvTJWOq05ilkdTkTLK7ShsqVpDWL89_5R5O3e3x7paO7-Ugj-rvLUcivOfLxq8v51-TKKnwSGVCHePcGvied7biNPvF3gpKmayXHYx`
      },
      params: {
        categories: this.state.category_map[this.state.category],
        location: this.state.location,
        term: this.state.keyword,
        open_now: this.state.open_now,
        sort_by: this.state.sort_map[this.state.sort_idx]
      }
    })
      .then((res) => {
        console.log(res.data.businesses)
      })
      .catch((err) => {
        console.log(err)
      })

    // alert('A form was submitted: ' + this.state.location + ' // ' + this.state.keyword+ this.state.open_now+ this.state.category_map[this.state.category]);
    event.preventDefault();

  }

  render() {
    const category_list = 'None, African, American, Arabian, Asian Fusion, Baguettes, Barbeque, Bistros, Breakfast & Brunch, Burgers, Cafes, Chinese, Fast Food, Indian, Italian, Japanese, Korean, Mediterranean, Mexican, Pizza, Salad, Sandwiches, Thai, Vegetarian';
    const selectOptions = category_list.split(', ');
    const selectOptionsList = selectOptions.map((selectOption, index) => {
      return <option key={index} value={index}>{selectOption}</option>
    });
    const sort_list = 'Best Match, Highest Rating, Most Popular, Nearest'
    const sortOptions = sort_list.split(', ');
    const sortOptionsList = sortOptions.map((selectOption1, index1) => {
      return <option key={index1} value={index1}>{selectOption1}</option>
    });
    return (
      <div id="form_outer">
        <form onSubmit={this.handleSubmit} >
          <div className="form-group">
            <label for="LocationInput">Location</label>
            <input type="text" name="location" required value={this.state.location} onChange={this.handleChange} className="form-control" id="LocationInput" />
          </div>
          <div className="form-group">
            <label for="KeyInput">Keyword</label>
            <input name="keyword" type="text" value={this.state.keyword} onChange={this.handleChange} className="form-control" id="KeyInput" />
          </div>
          <div className="form-group">
            <label for="CategoryInput">Eating Category</label><br />
            <select name="category" value={this.state.category} onChange={this.handleChange}>
              <option value='' disabled></option>
              {selectOptionsList}
            </select>
          </div>
          <div className="form-group">
            <label for="SortInput">Sort by</label><br />
            <select name="sort_idx" value={this.state.sort_idx} onChange={this.handleChange}>
              <option value='' disabled></option>
              {sortOptionsList}
            </select>
          </div>
          <div className="form-group">
            <input name="open_now" type="checkbox" value={this.state.open_now} onChange={this.handleChange} className="form-control" id="OpenInput" />
            <div id='open'>
              <label for="OpenInput">Open Now?</label>
            </div>
          </div>
          <input type="submit" value="Search" className="btn btn-primary" />
        </form>
      </div>
    )
  }
}


export default Restaurant;

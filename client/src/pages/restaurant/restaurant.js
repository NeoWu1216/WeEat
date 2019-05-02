import React, { Component } from 'react';
import './restaurant.scss';
import axios from 'axios';
import NavBar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";


class Restaurant extends Component {
  render() {
    return (
      <div id="restaurant_outer">
        <div id="rest_background">
        <NavBar />
        <Container />
        <Footer />
        </div>
      </div>
    )
  }
}


class Container extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: '',
      keyword: '',
      category: 0,
      open_now: false,
      sort_idx: 0,
      category_map: ['', 'african', 'tradamerican', 'arabian', 'asianfusion', 'baguettes', 'bbq', 'bistros', 'breakfast_brunch', 'burgers', 'cafes', 'chinese', 'hotdogs', 'indpak', 'italian', 'japanese', 'korean', 'mediterranean', 'mexican', 'pizza', 'salad', 'sandwiches', 'thai', 'vegetarian'],
      sort_map: ['best_match', 'rating', 'review_count', 'distance'],
      result: []
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
    // console.log('Change detected. State updated' + name + ' = ' + value);
  }

  handleSubmit(event) {
    axios.get(`http://localhost:8010/proxy/v3/businesses/search`, {
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
    }).then((res) => {
      this.setState({
        result: res.data.businesses
      });
    })
      .catch((err) => {
        console.log(err)
      })

    event.preventDefault();

  }
  handleSubmit2(event) {
    // console.log(this.state.result);
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
        <div className="left">
          <form onSubmit={this.handleSubmit} >
            <div className="form-group">
              <input type="text" placeholder="Location" name="location" required value={this.state.location} onChange={this.handleChange} className="form-control" id="LocationInput" />
            </div>
            <div className="form-group">
              <input name="keyword" placeholder="Keyword" type="text" value={this.state.keyword} onChange={this.handleChange} className="form-control" id="KeyInput" />
            </div>
            <div className="form-group">
              <label htmlFor="CategoryInput">Eating Category</label><br />
              <div id="select_style">
                <select name="category" value={this.state.category} onChange={this.handleChange}>
                  <option value='' disabled></option>
                  {selectOptionsList}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="SortInput">Sort by</label><br />
              <div id="select_style">
                <select name="sort_idx" value={this.state.sort_idx} onChange={this.handleChange}>
                  <option value='' disabled></option>
                  {sortOptionsList}
                </select>
              </div>
            </div>
            <div className="form-group">
              <input name="open_now" type="checkbox" value={this.state.open_now} onChange={this.handleChange} className="form-control" id="OpenInput" />
              <div id='open'>
                <label htmlFor="OpenInput">Open Now?</label>
              </div>
            </div>
            <input type="submit" value="Search" className="btn btn-primary" />
          </form>
        </div>
        <div className="right">
          <RestaurantList result={this.state.result} />
        </div>
      </div>
    )
  }
}

class RestaurantList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="list_container">
        {this.props.result.map((r, index) => <RestaurantEntry r={r} key={index} />)}
      </div>
    )
  }
}

class RestaurantEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let r = this.props.r
    return (
      <div key={r.name}>
        <div className="card">
          <div className="card_left">
            <img src={r.image_url} alt="img" />
          </div>
          <div className="card_right">
            <h1>{r.name}</h1>
            <div className="card_right__details">
              <ul>
                <li>Rating: {r.rating}</li><br />
                <li>Phone: {r.display_phone}</li><br />
                <li>Location: {r.location.display_address[0] + " "}{r.location.display_address[1]}</li><br />
                <li>Price: {r.price}</li><br />
                <li>Details: <a href={r.url}>Yelp</a></li>
              </ul>
              <div className="button">
                <a href="https://www.w3schools.com">WeEat Now!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Restaurant;

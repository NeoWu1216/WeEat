import React, { Component } from 'react';
import './restaurant.scss';
import axios from 'axios';
import NavBar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";


class Restaurant extends Component {
  render() {
    return (
      <div id="restaurant_outer">
        <NavBar />
        <ContactForm />
        <Footer />
      </div>
    )
  }
}


class ContactForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: '',
      keyword: '',
      category: 0,
      open_now: false,
      sort_idx: 0,
      category_map: ['', 'african', 'tradamerican', 'arabian', 'asianfusion', 'baguettes', 'bbq', 'bistros', 'breakfast_brunch', 'burgers', 'cafes', 'chinese', 'hotdogs', 'indpak', 'italian', 'japanese', 'korean', 'mediterranean', 'mexican', 'pizza', 'salad', 'sandwiches', 'thai', 'vegetarian'],
      sort_map: ['', 'rating', 'review_count', 'distance'],
      result: TEST_DATA.businesses
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
    }).then((res) => {
      // console.log(res.data.businesses)
      this.setState({
        result: res.data.businesses
      });
    })
      .catch((err) => {
        console.log(err)
      })

    // alert('A form was submitted: ' + this.state.location + ' // ' + this.state.keyword+ this.state.open_now+ this.state.category_map[this.state.category]);
    event.preventDefault();

  }
  handleSubmit2(event) {
    // console.log(TEST_DATA.businesses);
    // console.log("hahaha", TEST_DATA.businesses);
    //     this.setState({
    //       result:TEST_DATA.businesses
    //     });
    console.log(this.state.result);
    event.preventDefault();

  }

  render() {
    // console.log("result: ", this.state.result);
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
        <div class="left">
          <form onSubmit={this.handleSubmit} >
            <div className="form-group">

              <input type="text" placeholder="Location" name="location" required value={this.state.location} onChange={this.handleChange} className="form-control" id="LocationInput" />
            </div>
            <div className="form-group">
              <input name="keyword" placeholder="Keyword" type="text" value={this.state.keyword} onChange={this.handleChange} className="form-control" id="KeyInput" />
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
        <div className="restaurantrender" class="right">
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
        {this.props.result.map((r, index) => <RestaurantEntry r={r} />)}
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
            <img src={r.image_url} />
          </div>
          <div className="card_right">
            <h1>{r.name}</h1>
            <div className="card_right__details">
              <ul>
                <li>Rating: {r.rating}</li>
                <li>Phone: {r.display_phone}</li>
                <li>Location: {r.location.display_address[0]}{r.location.display_address[1]}</li>
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

var TEST_DATA = {
  "businesses": [
    {
      "id": "9MnbQg7kfb_WgxoV0hXKSQ",
      "alias": "black-dog-smoke-and-ale-house-urbana",
      "name": "Black Dog Smoke & Ale House",
      "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/lJOnFchw-mzW6H5IdKh8Zg/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/black-dog-smoke-and-ale-house-urbana?adjust_creative=EF1LVTfdsDuyWdMT_EVVSg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=EF1LVTfdsDuyWdMT_EVVSg",
      "review_count": 803,
      "categories": [
        {
          "alias": "bbq",
          "title": "Barbeque"
        }
      ],
      "rating": 4.5,
      "coordinates": {
        "latitude": 40.113818215463,
        "longitude": -88.207689252733
      },
      "transactions": [],
      "price": "$$",
      "location": {
        "address1": "201 N Broadway Ave",
        "address2": "",
        "address3": "",
        "city": "Urbana",
        "zip_code": "61801",
        "country": "US",
        "state": "IL",
        "display_address": [
          "201 N Broadway Ave",
          "Urbana, IL 61801"
        ]
      },
      "phone": "+12173449334",
      "display_phone": "(217) 344-9334",
      "distance": 1251.8136816166234
    },
    {
      "id": "VIJ2KiDKhUVhhpNylEIfog",
      "alias": "maize-mexican-grill-champaign",
      "name": "Maize Mexican Grill",
      "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/dU3DV0ENRuyUvMyFgPglUA/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/maize-mexican-grill-champaign?adjust_creative=EF1LVTfdsDuyWdMT_EVVSg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=EF1LVTfdsDuyWdMT_EVVSg",
      "review_count": 546,
      "categories": [
        {
          "alias": "mexican",
          "title": "Mexican"
        }
      ],
      "rating": 4.5,
      "coordinates": {
        "latitude": 40.11037,
        "longitude": -88.23891
      },
      "transactions": [],
      "price": "$",
      "location": {
        "address1": "60 E Green Street",
        "address2": null,
        "address3": "",
        "city": "Champaign",
        "zip_code": "61820",
        "country": "US",
        "state": "IL",
        "display_address": [
          "60 E Green Street",
          "Champaign, IL 61820"
        ]
      },
      "phone": "+12173556400",
      "display_phone": "(217) 355-6400",
      "distance": 1606.1486452942813
    }
  ]
};
export default Restaurant;

import React, { Component } from 'react';
import './navbar.scss';


class NavBar extends React.Component {
    render() {
        return (
            <div id="navbar">
                <a href="/" id="logo">WeEat</a>
                <div id="navbar_right">
                    <button type="button" className="navbar_button">Eating Rooms</button>
                    <button type="button" className="navbar_button">Restaurants</button>
                    <button type="button" id="profile_icon"><i class="fa fa-user-circle"></i></button>
                </div>
            </div>
        )
    }
}


export default NavBar;

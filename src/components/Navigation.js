import React from "react";
import { Link } from "react-router-dom";
import "../App.scss";
import { HashRouter, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

class Navigation extends React.Component {

  handleHamburgerClick() {
    this.props.onHamburgerChange();
  }

  render() {
    switch (this.props.loggedIn) {
      case false:
        return (
          <nav className="navbar">
            <div className="header-items">
              <a href="#" className="logo">
                SHITTER.
              </a>
              <svg
                className={
                  !this.props.isExpanded ? "ham ham7" : "ham ham7 active"
                }
                onClick={this.handleHamburgerClick.bind(this)}
                viewBox="0 0 100 100"
                width="80"
                // onclick={this.classList.toggle('active')}
              >
                <path
                  className="line top"
                  d="m 70,33 h -40 c 0,0 -6,1.368796 -6,8.5 0,7.131204 6,8.5013 6,8.5013 l 20,-0.0013"
                />
                <path className="line middle" d="m 70,50 h -40" />
                <path
                  className="line bottom"
                  d="m 69.575405,67.073826 h -40 c -5.592752,0 -6.873604,-9.348582 1.371031,-9.348582 8.244634,0 19.053564,21.797129 19.053564,12.274756 l 0,-40"
                />
              </svg>
            </div>

            <ul
              className={
                !this.props.isExpanded ? "main-nav" : "main-nav active"
              }
            >
              <li>
                  <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          </nav>
        );
        break;
      case true:
        return (
          <nav className="navbar">
            <div className="header-items">
              <a href="#" className="logo">
                SHITTER.
              </a>
              <svg
                className={
                  !this.props.isExpanded ? "ham ham7" : "ham ham7 active"
                }
                onClick={this.handleHamburgerClick.bind(this)}
                viewBox="0 0 100 100"
                width="80"
                // onclick={this.classList.toggle('active')}
              >
                <path
                  className="line top"
                  d="m 70,33 h -40 c 0,0 -6,1.368796 -6,8.5 0,7.131204 6,8.5013 6,8.5013 l 20,-0.0013"
                />
                <path className="line middle" d="m 70,50 h -40" />
                <path
                  className="line bottom"
                  d="m 69.575405,67.073826 h -40 c -5.592752,0 -6.873604,-9.348582 1.371031,-9.348582 8.244634,0 19.053564,21.797129 19.053564,12.274756 l 0,-40"
                />
              </svg>
            </div>

            <ul
              className={
                !this.props.isExpanded ? "main-nav" : "main-nav active"
              }
            >
              <li>
                <Link className="nav-links" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="nav-links" to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        );
        break;
    }
  }
}

export default Navigation;

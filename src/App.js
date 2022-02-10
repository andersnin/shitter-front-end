import logo from "./logo.svg";
import React from "react";
import "./App.scss";
import { HashRouter, Switch, Route } from "react-router-dom";

// Components
import Feed from "./components/Feed";
import UserFeed from "./components/UserFeed";
import Login from "./components/Login";
import Logout from "./components/Logout";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hamburgerActive: false,
    };
  }

  handleHamburgerClick() {
    switch (this.state.hamburgerActive) {
      case false:
        this.setState({
          hamburgerActive: true,
        });
        break;
      case true:
        this.setState({
          hamburgerActive: false,
        });
        break;
    }
  }

  render() {
    return (
      <HashRouter>
        <div>
          <nav className="navbar">
            <div className="header-items">
              <a href="#" className="logo">
                SHITTER.
              </a>
              <svg
                className={
                  !this.state.hamburgerActive ? "ham ham7" : "ham ham7 active"
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
                !this.state.hamburgerActive ? "main-nav" : "main-nav active"
              }
            >
              <li>
                <a href="#" className="nav-links">
                  Home
                </a>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/" exact component={Feed} />
            <Route path="/user/:username" component={UserFeed} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;

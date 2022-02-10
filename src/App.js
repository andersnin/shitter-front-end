import React from "react";
import { Link } from "react-router-dom";
import "./App.scss";
import { HashRouter, Switch, Route } from "react-router-dom";

// Components
import Feed from "./components/Feed";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import UserFeed from "./components/UserFeed";
import Navigation from "./components/Navigation";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      isExpanded: false,
    };
  }

  handleHamburgerChange(action) {
    switch (action) {
      case "toggle": 
      this.setState({
        isExpanded: !this.state.isExpanded
      })
      break;
      case "close": 
      this.setState({
        isExpanded: false
      })
      break;
      case "open": 
      this.setState({
        isExpanded: true
      })
    }
  }

  componentDidMount() {
    this.handleLoginStatusChange();
  }

  handleLoginStatusChange() {
    this.setState({
      loggedIn: !!localStorage.getItem("twitter_clone_token"),
    });
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Navigation
            loggedIn={this.state.loggedIn}
            isExpanded={this.state.isExpanded}
            onHamburgerChange={this.handleHamburgerChange.bind(this)}
          />

          <Switch>
            <Route path="/" exact component={Feed} />
            <Route path="/user/:username" component={UserFeed} />
            <Route path="/signup" component={Signup} />
            <Route
              path="/login"
              render={(routeProps) => (
                <Login
                  {...routeProps}
                  onHamburgerChange={this.handleHamburgerChange.bind(this)}
                  onLoginChange={this.handleLoginStatusChange.bind(this)}
                />
              )}
            />
            <Route
              path="/logout"
              render={(routeProps) => (
                <Logout
                  {...routeProps}
                  onHamburgerChange={this.handleHamburgerChange.bind(this)}
                  onLoginChange={this.handleLoginStatusChange.bind(this)}
                />
              )}
            />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;

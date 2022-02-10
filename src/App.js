import React from "react";
import { Link } from "react-router-dom";
import "./App.scss";
import { HashRouter, Switch, Route } from "react-router-dom";

// Components
import Feed from "./components/Feed";
import UserFeed from "./components/UserFeed";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Navigation from "./components/Navigation";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    const token = !!localStorage.getItem("twitter_clone_token");
    console.log(token);

    if (token) {
      this.setState({
        loggedIn: true,
      });
    }
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Navigation loggedIn={this.state.loggedIn} />

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

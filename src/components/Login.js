import React from "react";
import { getLoginToken } from "../services/session";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  handleInputChange(field, event) {
    this.setState({
      [field]: event.target.value,
    });
  }

  async handleLoginAttempt() {
    const { history } = this.props;

    // perform the actual login

    try {
      // 1. Make a POST request to /login in the API
      const { token } = await getLoginToken({
        username: this.state.username,
        password: this.state.password,
      });

      if (!token) {
        throw new Error("Unsuccessful login");
      }

      // 2. Store token in local storage
      localStorage.setItem("twitter_clone_token", token);

      // 3. Redirect back to feed
      history.replace("/");
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="login-container">
        <h1>Login</h1>
        <div className="login-field">
          <label>Username:</label>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleInputChange.bind(this, "username")}
          />
        </div>
        <div className="login-field">
          <label>Password:</label>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange.bind(this, "password")}
          />
        </div>
        <div>
          <button
            className="button-24"
            role="button"
            onClick={this.handleLoginAttempt.bind(this)}
          >
            Log in
          </button>
        </div>
      </div>
    );
  }
}

export default Login;

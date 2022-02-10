import React from "react";
import { signupNewUser } from "../services/tweets";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      username: "",
      password: "",
      img_url: "",
      bio: "",
    };
  }

  handleInputChange(field, event) {
    this.setState({
      [field]: event.target.value,
    });
  }

  async handleSignupSubmit() {
    const { name, username, password, img_url, bio } = this.state;
    const { history } = this.props;

    await signupNewUser(name, username, password, img_url, bio);
    history.replace("/");
  }

  render() {
    return (
      <div className="signup-container">
        <h1>Sign Up</h1>
        <div className="signup-input">
          <label>Full Name:</label>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleInputChange.bind(this, "name")}
          />
        </div>
        <div className="signup-input">
          <label>Username:</label>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleInputChange.bind(this, "username")}
          />
        </div>
        <div className="signup-input">
          <label>Password:</label>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange.bind(this, "password")}
          />
        </div>
        <div className="signup-input">
          <label>Bio:</label>
          <input
            type="text"
            value={this.state.bio}
            onChange={this.handleInputChange.bind(this, "bio")}
          />
        </div>
        <div className="signup-input">
          <label>Img-url:</label>
          <input
            type="text"
            value={this.state.img_url}
            onChange={this.handleInputChange.bind(this, "img_url")}
          />
        </div>
        <button
          className="button-24"
          role="button"
          onClick={this.handleSignupSubmit.bind(this)}
        >
          Sign up
        </button>
      </div>
    );
  }
}

export default Signup;

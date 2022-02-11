import React from "react";
import { editUser, getUserByUsername } from "../services/tweets";
import jwtDecode from "jwt-decode";

class Edit extends React.Component {
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

  async componentDidMount() {
    const token = localStorage.getItem("twitter_clone_token");
    const payload = jwtDecode(token);
    const user = await getUserByUsername(payload.username);
    this.setState({
      name: user.name,
      username: user.username,
      password: user.password,
      img_url: user.img_url,
      bio: user.bio,
    });
  }

  handleInputChange(field, event) {
    this.setState({
      [field]: event.target.value,
    });
  }

  async handleSignupSubmit() {
    const { name, username, password, img_url, bio } = this.state;
    const { history } = this.props;

    await editUser(name, username, password, img_url, bio);
    history.replace("/");
  }

  render() {
    return (
      <div className="signup-container">
        <h1>Edit User</h1>
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
          Edit
        </button>
      </div>
    );
  }
}

export default Edit;

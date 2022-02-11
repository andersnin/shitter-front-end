import React from "react";
import { Link } from "react-router-dom";
import { getTweets, postTweet } from "../services/tweets";
import jwtDecode from "jwt-decode";
const { DateTime } = require("luxon");

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: [],
      isLoading: false,
      error: null,
      message: "",
      payload: {},
    };
  }

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem("twitter_clone_token");

    if (!token) {
      history.replace("/login");
      return;
    }

    const payload = jwtDecode(token);

    this.setState({
      payload,
    });

    await this.populateTweets();
  }

  async populateTweets() {
    try {
      this.setState({ isLoading: true });
      const tweets = await getTweets();
      this.setState({ tweets: tweets, isLoading: false });
    } catch (error) {
      this.setState({ error });
    }
  }

  async handleSubmitTweet() {
    const { message } = this.state;

    if (!message) {
      return;
    }

    await postTweet(message);
    await this.populateTweets();
  }

  handleInputChange(field, event) {
    this.setState({
      [field]: event.target.value,
    });
  }

  render() {
    const { tweets, isLoading, error, message } = this.state;

    if (error) {
      return (
        <div>
          <p>Oops! Something went wrong!</p>
          <pre>{error.message}</pre>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div style={{ textAlign: "center" }}>
          <p>Loading Shitposts...</p>
        </div>
      );
    }

    const shits = tweets.map((tweet) => {
      let convertedTime = DateTime.fromISO(tweet.created_at).toRelative();

      return (
        <div className="post-container" key={tweet.id}>
          <div className="user-image">
            <Link to={`/user/${tweet.username}`}>
              <img
                src={
                  !tweet.img_url
                    ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Emoji_u1f4a9.svg/1200px-Emoji_u1f4a9.svg.png"
                    : tweet.img_url
                }
                alt="user-picture"
              />
            </Link>
          </div>
          <div className="post-content">
            <div className="user-info">
              <p>
                <strong>{tweet.name}</strong>{" "}
                <Link to={`/user/${tweet.username}`}>(@{tweet.username})</Link>
              </p>
              <p className="timestamp">{convertedTime}</p>
            </div>
            <div className="user-message">
              <p>{tweet.message}</p>
            </div>
          </div>
        </div>
      );
    });

    return (
      <article>
        <div className="message-box">
          <input
            type="text"
            placeholder="Post shit."
            value={message}
            onChange={this.handleInputChange.bind(this, "message")}
          />
          <button
            className="button-24"
            role="button"
            onClick={this.handleSubmitTweet.bind(this)}
          >
            Post
          </button>
        </div>
        {shits.length ? <div>{shits}</div> : <p>No shit to show!</p>}
      </article>
    );
  }
}

export default Feed;

import React from "react";
import { Link } from "react-router-dom";
import { getTweets, getTweetsByUsername, postTweet } from "../services/tweets";
import jwtDecode from "jwt-decode";
const { DateTime } = require("luxon");

class UserFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: [],
      isLoading: false,
      isUser: false,
      error: null,
      payload: {},
    };
  }

  async componentDidMount() {
    const { username } = this.props.match.params;

    const token = localStorage.getItem("twitter_clone_token");

    const payload = jwtDecode(token);

    this.setState({
      payload,
    });

    if (username === payload.username) {
      this.setState({
        isUser: "true",
      });
    }

    try {
      this.setState({ isLoading: true });
      const tweets = await getTweetsByUsername(username);
      this.setState({ tweets, isLoading: false });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { tweets, isLoading, error } = this.state;
    const { username } = this.props.match.params;

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
          <p>Loading Jobs...</p>
        </div>
      );
    }

    const shits = tweets.map((tweet) => {
      let convertedTime = DateTime.fromISO(tweet.created_at).toRelative();

      if (this.state.isUser) {
        return (
          <div className="post-container" key={tweet.id}>
            <div className="user-image">
              <img
                src={
                  !tweet.img_url
                    ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Emoji_u1f4a9.svg/1200px-Emoji_u1f4a9.svg.png"
                    : tweet.img_url
                }
                alt="user-picture"
              />
            </div>
            <div className="post-content">
              <div className="user-info">
                <p>
                  <strong>{tweet.username}</strong>
                </p>
                <p>{convertedTime}</p>
              </div>
              <div className="user-message">
                <p>{tweet.message}</p>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="post-container" key={tweet.id}>
            <div className="user-image">
              <img
                src={
                  !tweet.img_url
                    ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Emoji_u1f4a9.svg/1200px-Emoji_u1f4a9.svg.png"
                    : tweet.img_url
                }
                alt="user-picture"
              />
            </div>
            <div className="post-content">
              <div className="user-info">
                <p>
                  <strong>{tweet.username}</strong>
                </p>
                <p className="timestamp">{convertedTime}</p>
              </div>
              <div className="user-message">
                <p>{tweet.message}</p>
              </div>
            </div>
          </div>
        );
      }
    });

    if (this.state.isUser) {
      return (
        <article>
          <div><h2>Your posts:</h2></div>
          <div className="user-info-header"></div>
          {shits.length ? <div>{shits}</div> : <p>No shit to show!</p>}
        </article>
      );
    } else {
      return (
        <article>
          <div className="user-info-header"></div>
          {shits.length ? <div>{shits}</div> : <p>No shit to show!</p>}
        </article>
      );
    }
  }
}

export default UserFeed;

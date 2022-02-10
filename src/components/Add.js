import React from "react";

import { postTwat } from "../services/services";

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      user_id: "1"
    };

    // Prefix functions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    if (window.confirm("Confirm to add new job listing.")) {
      await postTwat(this.state);
      this.props.changeView("overview");
    } else return;
  }

  handleCancel(event) {
    if (window.confirm("Confirm cancel.")) {
      this.props.changeView("overview");
    } else return;
  }

  render() {
    return (
      <article>
        <form className="job-form">
          <label>Message:</label>
          <input
            type="text"
            name="message"
            value={this.state.message}
            onChange={this.handleInputChange}
          />
        </form>
        <div className="form-buttons">
          <button
            onClick={this.handleSubmit}
          >
            SEND SHIT
          </button>
          <button className="cancel-button" onClick={this.handleCancel}>
            CANCEL
          </button>
        </div>
      </article>
    );
  }
}

export default Add;

import React from 'react';

class Logout extends React.Component {
  async componentDidMount() {
    const { history } = this.props;

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    localStorage.removeItem('twitter_clone_token');
    this.props.onLoginChange();
    this.props.onHamburgerChange();
    history.replace('/');
  }

  render() {
    return (
      <div>Logging out...</div>
    );
  }
}

export default Logout;
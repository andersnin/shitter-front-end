/**
 * Services for interacting with jobs api
 */

const API_URL = process.env.REACT_APP_API_URL;

export function getTweets() {
  return fetch(`${API_URL}/tweets`)
  .then((res) => res.json());
}

export function getTweetsByUsername(username) {
  return fetch(`${API_URL}/tweets/${username}`)
  .then((res) => res.json());
}

export function postTweet(message) {
  return fetch(`${API_URL}/tweets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': localStorage.getItem('twitter_clone_token')
    },
    body: JSON.stringify({ message })
  })
  .then((res) => res.json());
}

export function signupNewUser(name, username, password, img_url, bio) {
  return fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, username, password, img_url, bio })
  })
  .then((res) => res.json());
}

export function editUser(name, username, password, img_url, bio) {
  return fetch(`${API_URL}/edit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, username, password, img_url, bio })
  })
  .then((res) => res.json());
}

export function getUserByUsername(username) {
  return fetch(`${API_URL}/edit/${username}`)
  .then((res) => res.json());
}

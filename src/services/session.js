const API_URL = process.env.API_URL;

export async function getLoginToken({ username, password }) {
  return fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password }),
  })
  .then((res) => res.json()).then((json) => console.log(json));
}


export class UserServiceClient {

  URL = 'http://localhost:3001';

  auth = '';

  login(username, password) {
    const credentials = (username + ':' + password);
    const base64encodedData = btoa(credentials);
    this.auth = base64encodedData;
    return fetch(this.URL + '/time', {
      method: 'get',
      // body: JSON.stringify(credentials),
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Basic ' + base64encodedData
      }
    }).then(response => response.json());
  }

  logout() {
    return fetch(this.URL + '/logout', {
      method: 'post',
      credentials: 'include'
    });
  }

  profile() {
    return fetch(this.URL + '/profile',
      {
        credentials: 'include',
      })
      .then(response => response.json());
  }

  createUser(username, password) {
    const user = {
      username: username,
      password: password
    };
    const base64encodedData = btoa(username + ':' + password);
    this.auth = base64encodedData;
    return fetch(this.URL + '/user/register', {
      body: JSON.stringify(user),
      credentials: 'include', // include, same-origin, *omit
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());;
  }

}

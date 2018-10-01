export class UserServiceClient {

  URL = 'http://localhost:4200';


  login(username, password) {
    const credentials = {
      username: username,
      password: password
    };
    return fetch('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'post',
      body: JSON.stringify(credentials),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
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
    return fetch(this.URL + '/user/register', {
      body: JSON.stringify(user),
      credentials: 'include', // include, same-origin, *omit
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

}

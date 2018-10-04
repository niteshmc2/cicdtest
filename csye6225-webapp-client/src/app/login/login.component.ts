import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   message;
  username;
  password;
  constructor(private router: Router,
              private service: UserServiceClient) { }

  ngOnInit() {
  }


  login(username, password) {
    this.username = username;
    this.password = password;
    this.service
      .login(username, password)
      .then(() => this.router.navigate(['transactions']), () => alert('Enter Correct credentials'));
    //   .then(() => this.check_login(this.credentials));
    alert('login pressed');

  }
}

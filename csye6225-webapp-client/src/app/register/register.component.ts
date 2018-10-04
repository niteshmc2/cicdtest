import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username;
  password;
  password2;

  constructor(private router: Router,
              private service: UserServiceClient) { }

  register(username, password, password2) {
    if (password !== this.password2) {
      alert("Password mismatch. Pls Re-try");
      return;
    }
    // this.service
    //   .findUsername(username)
    //   .then((usrname) => {
    //     if (usrname !== null) {
    //       alert("Username already exists");
    //     }
        else {
      this.service
        .createUser(username, password)
        .then(res => {
          if (res.sc == 201) {
            // alert(res.login);
            this.router.navigate(['transactions']);
          } else {
            alert('Enter Correct Credentials');
          }
        });
    }
      // });
  }



  ngOnInit() {
  }

}

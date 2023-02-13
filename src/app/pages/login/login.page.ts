import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/http/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService, private alert: AlertService, private router: Router) { }
  credentials = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  pwdIcon = "eye-outline";
  showPwd = false;
  ngOnInit() {
  }

  login() {
    this.userService.login(this.credentials.value).subscribe((res) => {
      localStorage.setItem('user_token', res['token']);
      this.alert.presentAlert("Login Successful", "Welcome back!","", ["Ok"]);
      this.router.navigate(['/profile']);
    }, (err) => {
      if (err.error.message) {
        this.alert.presentAlert("Warning", "", err.error.message, ["Ok"]);
      } else if (err.name == "HttpErrorResponse") {
        this.alert.presentAlert("Server Error", "Please try again later", "", ["Ok"]);
      }
      else {
        this.alert.presentAlert("Error", "", err.error, ["Ok"]);
      }
    });
  }

  togglePwd() {
    this.showPwd = !this.showPwd;
    this.pwdIcon = this.showPwd ? "eye-off-outline" : "eye-outline";
  }
}

import { Router } from '@angular/router';
import { AlertService } from './../../services/alert.service';
import { UserService } from './../../services/http/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  showPwd = false;
  pwdIcon = 'eye';
  constructor(private formBuilder: FormBuilder, private userService: UserService, private alert: AlertService, private router: Router) { }
  credentials = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]]
  },
    {
      validator: this.MustMatch('password', 'password2')
    });
  ngOnInit() {
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: any) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  register() {
    this.userService.register(this.credentials.value).subscribe(
      (data) => {
        this.alert.presentToast('Registration successful', 2000, 'top', 'success');
        this.router.navigate(['/login']);
      },
      (error) => {
        this.alert.presentToast('Registration failed', 2000, 'top', 'danger');
      }
    );
  }
}

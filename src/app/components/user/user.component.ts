import { AlertService } from './../../services/alert.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/http/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true
})
export class UserComponent implements OnInit {
  @Input() user;
  @Input() type;
  @Input() refresh;
  btn;
  btn_del;
  title;
  email_verified;
  phone_verified;
  constructor(private formBuilder: FormBuilder, private modalCtr: ModalController, private userService: UserService, private alert: AlertService) { }
  form = this.formBuilder.group({
    name: [''],
    email: [''],
    phone: [''],
    permission: [''],
    password: ['']
  });
  ngOnInit() {
    this.btn = document.getElementById('btn');
    this.btn_del = document.getElementById('btn_del');
    this.title = document.getElementById('title');
    if (this.type == 'up') {
      this.btn.innerHTML = 'Update';
      this.title.innerHTML = this.user.name;
      this.email_verified = this.user.email_verified == 1 ? 'Yes' : 'No';
      this.phone_verified = this.user.phone_verified == 1 ? 'Yes' : 'No';
      this.form.patchValue({
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
        permission: this.user.permission
      });

    }
    else {
      this.btn.innerHTML = 'Add';
      this.title.innerHTML = 'Add user';
      this.btn_del.style.display = 'none';
    }

  }

  dismiss() {
    this.modalCtr.dismiss();
  }
  submit() {
    if ((this.form.value.name == "" || this.form.value.email == "" || this.form.value.phone == "" || this.form.value.permission == "") && this.type == 'up') {
      this.alert.presentAlert('Please Fill All Fields', "", "", ['ok']);
    }
    else {
      if (this.type == 'up') {
        this.userService.update(this.form.value).subscribe(data => {
          if (data.error != undefined) {
            this.alert.presentToast(data.error, 3000, 'top', 'danger');
          }
          else {
            this.alert.presentToast('user Successfully Updated', 3000, 'top', 'success');
            this.refresh();
          }
        }, error => {
          this.alert.presentToast('Error Updating user', 3000, 'top', 'danger');
        });
      }
      else {
        const val = {
          name: this.form.value.name,
          email: this.form.value.email,
          phone: this.form.value.phone,
          permission: this.form.value.permission,
          password: this.form.value.password,
          add: 'true'
        }
        this.userService.add(val).subscribe(data => {
          console.log(data);

          if (data.error != undefined) {
            this.alert.presentToast(data.error, 3000, 'top', 'danger');
            this.refresh();
          }
          else {
            this.alert.presentToast('user Successfully Added', 3000, 'top', 'success');
            this.refresh();
          }
        }, error => {
          console.log(error);
          this.alert.presentToast('Error Adding user', 3000, 'top', 'danger');
        });
      }
    }
  }
  del() {
    this.userService.delete({ 'email': this.user.email }).subscribe(data => {
      if (data.error != undefined) {
        this.alert.presentToast(data.error, 3000, 'top', 'danger');
      }
      else {
        this.alert.presentToast('user Successfully Deleted', 3000, 'top', 'success');
        this.refresh();
        this.dismiss();
      }

    }, error => {
      console.log(error);
      this.alert.presentToast('Error Deleting user', 3000, 'top', 'danger');
    });
  }
}

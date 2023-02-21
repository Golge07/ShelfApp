import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/http/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  per_info = "";
  constructor(private userService: UserService,private navCtrl:NavController) { }
  loaded = true;
  user = {};
  email_icon = "close-circle-outline";
  async ngOnInit() {
    let icon = document.getElementsByClassName('email_icon');
    await this.userService.get_user().subscribe((res) => {
      if (res['user']['email_verified'] == 0) {
        this.email_icon = "close-circle-outline";
      }
      else {
        this.email_icon = "checkmark-circle-outline";
      }

      this.user = res['user'];
      this.per_inf(this.user['permission']);
    }, (err) => {
      console.log(err);
    });

  }

  per_inf(per) {
    const perm = {
      str: per.substring(0, 1),
      int: per.substring(1, 2),
    }

    switch (perm.str) {
      case 'S':
        switch (perm.int) {
          case '1':
            this.per_info = "Web Developer Chief";
            break;
          case '2':
            this.per_info = "Web Devloper Chief Assistant";
            break;
          case '3':
            this.per_info = "Web Developer Frontend";
            break;
          case '4':
            this.per_info = "Web Developer Backend";
            break;
        }
        break;
      case 'A':
        switch (perm.int) {
          case '1':
            this.per_info = "asd";
            break;
          case '2':
            this.per_info = "Admin";
            break;
        }
        break;
      case 'B':
        switch (perm.int) {
          case '1':
            this.per_info = "Web Programmer Chief";
            break;
          case '2':
            this.per_info = "Frontend Programmer";
            break;
          case '3':
            this.per_info = "Backend Programmer";
            break;
        }
        break;
      case 'D':
        switch (perm.int) {
          case '1':
            this.per_info = "Guest";
            break;
        }
    }
  }

  settings() {
    this.navCtrl.navigateRoot('/settings', { animationDirection: 'forward', animated: true });
  }
  
}
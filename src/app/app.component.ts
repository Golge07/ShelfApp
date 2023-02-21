import { AlertService } from './services/alert.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { UserService } from './services/http/user.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private route: Router, private navCtrl: NavController, private userService: UserService, private alertService: AlertService) { }
  page = ""
  user_name;
  icon = {
    profile: "person-outline",
    theme: "moon-outline",
    settings: "options-outline",
    logout: "log-out-outline"
  }

  ngOnInit() {
    this.user_name = localStorage.getItem('user_name');
  }

  logout() {
    this.userService.logout();
  }

  shelves() {
    this.page = 'Shelves';
    this.user_name = localStorage.getItem('user_name');
    this.navCtrl.navigateRoot('/shelves', { animationDirection: 'back', animated: true });
  }

  profile() {
    this.page = 'Profile'
    this.user_name = localStorage.getItem('user_name');
    this.navCtrl.navigateRoot('/profile', { animationDirection: 'forward', animated: true });
  }

  users() {
    this.page = 'Users'
    this.user_name = localStorage.getItem('user_name');
    this.navCtrl.navigateRoot('/users', { animationDirection: 'forward', animated: true });
  }

  settings(){
    this.page = 'Settings'
    this.user_name = localStorage.getItem('user_name');
    this.navCtrl.navigateRoot('/settings', { animationDirection: 'forward', animated: true });
  }
  theme() {
    if (localStorage.getItem('theme') == 'dark') {
      localStorage.setItem('theme', 'light');
      this.icon.theme = "sunny-outline";
    } else {
      localStorage.setItem('theme', 'dark');
      this.icon.theme = "moon-outline";
    }
  }
}

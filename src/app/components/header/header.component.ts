import { UserService } from '../../services/http/user.service';
import { Router } from '@angular/router';
import { IonicModule, PopoverController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule],
  inputs: ['page']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) { }
  page = Input().page;
  user_name;
  icon = {
    profile: "person-outline",
    theme: "moon-outline",
    settings: "options-outline",
    logout: "log-out-outline"
  }
  ngOnInit() {
    this.userService.get_user().subscribe((data) => {
      this.user_name = data.user['name'];
    })
  }

  logout() {
    this.userService.logout();
  }

  shelves() {
    this.router.navigate(['/shelves']);
  }

  profile() {
    this.router.navigate(['/profile']);
  }

  users() {
    this.router.navigate(['/users']);
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
  settings(type?: 'user' | 'web') {
    if (type == 'user') {
      this.router.navigate(['/settings/user']);
    } else {
      this.router.navigate(['/settings']);
    }
  }

}


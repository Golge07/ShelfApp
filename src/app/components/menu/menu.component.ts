import { UserService } from './../../services/http/user.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }
  user_name;
  ngOnInit() {
    this.userService.get_user().subscribe((data) => {
      console.log(data);
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

  settings() {
    this.router.navigate(['/settings']);
  }
}


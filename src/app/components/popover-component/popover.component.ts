import { UserService } from 'src/app/services/http/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'popover_profile',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class PopoverComponent implements OnInit {
  icon = {
    profile: "person-outline",
    theme: "moon-outline",
    settings: "options-outline",
    logout: "log-out-outline"
  }
  constructor(private router:Router,private userService:UserService) { }

  ngOnInit() { }

  profile(){
   this.router.navigate(['/profile']);
  }

  settings(){
    this.router.navigate(['/settings']);
  }

  theme(){
    if(localStorage.getItem('theme') == 'dark'){
      localStorage.setItem('theme', 'light');
      this.icon.theme = "sunny-outline";
    }else{
      localStorage.setItem('theme', 'dark');
      this.icon.theme = "moon-outline";
    }
  }

  logout(){
  this.userService.logout();
  }
}

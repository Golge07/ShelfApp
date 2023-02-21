import { UserService } from 'src/app/services/http/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private us: UserService) { }
  lang = 'en';
  theme = 'dark';
  user = {};
  ngOnInit() {
    this.us.get_user().subscribe((res: any) => {
      this.user = res['user'];
    })
  }

}

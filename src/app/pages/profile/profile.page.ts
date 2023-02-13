import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover-component/popover.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/http/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private popCtrl: PopoverController, private userService: UserService, private router: Router) { }
  loaded = true;
  user = {};
  email_icon = "close-circle-outline";
  ngOnInit() {
    let icon = document.getElementsByClassName('email_icon');
    this.userService.get_user().subscribe((res) => {
      if (res['user']['email_verified'] == 0) {
        this.email_icon = "close-circle-outline";
        icon[0].classList.add("red");
      }
      else {
        this.email_icon = "checkmark-circle-outline";
        icon[0].classList.add("green");
      }
      this.user = res['user'];
    }, (err) => {
      console.log(err);
    });
  }
  async presentPopover(e: Event) {
    const popover = await this.popCtrl.create({
      component: PopoverComponent,
      event: e,
    });
    await popover.present();
  }

}

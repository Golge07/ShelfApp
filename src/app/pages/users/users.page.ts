import { UserComponent } from './../../components/user/user.component';
import { ShelfService } from 'src/app/services/http/shelf.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/http/user.service';
import { PopoverController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { PopoverComponent } from 'src/app/components/popover-component/popover.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  constructor(private popCtrl: PopoverController, private shelfService: ShelfService, private userService: UserService, private router: Router, private modalCtr: ModalController) { }
  loaded = false;
  users: Array<any> = [];
  search_filter = 'all';
  filter = [
    { id: 1, name: 'All', type: 'all' },
    { id: 2, name: 'Name', type: 'name' },
    { id: 3, name: 'Email', type: 'email' },
    { id: 4, name: 'Phone', type: 'phone' },
  ]


  ngOnInit() {
    this.get_all_users();
    this.get_infos();
  }

  search_users(event) {
    const table = document.getElementById('table');
    const not_found = document.getElementById('not-found');
    const search = event.target.value;

    if (search.trim() != '') {
      this.userService.search_user({ 'type': this.search_filter, 'value': search }).subscribe((data) => {
        this.users = data['response'];
        if (this.users.length == 0) {
          if (table != null && not_found != null) {
            table.classList.add('transparent')
            not_found.classList.add('show')
          }
        } else {
          if (table != null && not_found != null) {
            table.classList.remove('transparent')
            not_found.classList.remove('show')
          }
        }
      },
        (error) => {
          console.log(error);
          if (error.error.message == "Unauthenticated.") {
            {
              this.router.navigate(['/login']);
              localStorage.removeItem('user_token');
            }
          } else {
            this.loaded = true;
            const label = not_found?.querySelector('ion-label');
            if (table != null && not_found != null && label != null) {
              table.className = 'transparent';
              label.innerHTML = 'Error Loading Users';
              not_found.className = 'show'
            }
          }
        });
    } else {
      this.get_all_users();
    }
  }

  get_all_users() {
    const table = document.getElementById('table');
    const not_found = document.getElementById('not-found');
    this.userService.get_all_users().subscribe((data) => {
      this.users = data['response'];
      this.loaded = true;
      if (this.users.length == 0) {
        if (table != null && not_found != null) {
          table.className = 'transparent'
          not_found.className = 'show'
        }
      } else {
        if (table != null && not_found != null) {
          table.className = 'table_'
          not_found.className = 'transparent'
        }
      }
    }, (error) => {
      if (error.error.message == "Unauthenticated.") {
        this.unauthorized();
      } else {
        this.loaded = true;
        const label = not_found?.querySelector('ion-label');
        if (table != null && not_found != null && label != null) {
          table.className = 'transparent';
          label.innerHTML = 'Error Loading Users';
          not_found.className = 'show'
        }
      }
    });
  }

  get_infos() {
    const shelves = document.getElementById('total_shelves');
    const quantity = document.getElementById('total_quantity');
    const user = document.getElementById('total_user');

    this.shelfService.get_info().subscribe((data) => {
      if (shelves != null && quantity != null) {
         this.set_infos_value(data.response['total_shelves'], data.response['total_quantity'])
      }
    }, (error) => {
      if (error.error.message == "Unauthenticated.")
        this.unauthorized();
      else
        this.set_infos_value('err', 'err');
    }
    );
    this.userService.info().subscribe((data) => {
      if (user != null)
        user.innerHTML = data.response['total_users'];
    },
      (error) => {
        if (error.error.message == "Unauthenticated.")
          this.unauthorized();
        else
          this.set_infos_value(undefined, undefined, 'err');
      });
  }

  refresh() {
    this.get_all_users();
    this.get_infos();
  }

  on_change(event) {
    this.search_filter = event;
  }

  async show_modal(user, type: 'up' | 'add' | 'err') {
    if (type == 'err') {
    } else {
      const modal = await this.modalCtr.create({
        component: UserComponent,
        componentProps: { user: user, type: type, refresh: this.refresh.bind(this) },
      });
      return await modal.present();
    }
  }

  async presentPopover(e: Event) {
    const popover = await this.popCtrl.create({
      component: PopoverComponent,
      event: e,
    });
    await popover.present();
  }

  unauthorized() {
    this.router.navigate(['/login']);
    localStorage.removeItem('user_token');
  }

  set_infos_value(shelves_?: | number | 'err' | undefined, quantity_?: | number | 'err' | undefined, user_?: | number | 'err' | undefined) {
    const shelves = document.getElementById('total_shelves');
    const quantity = document.getElementById('total_quantity');
    const user = document.getElementById('total_user');
    if (shelves != null && quantity != null && user != null) {
      shelves_ == undefined ? null : user.innerHTML = shelves_.toString() || 'error';
      quantity_ == undefined ? null : quantity.innerHTML = quantity_.toString() || 'error';
      user_ == undefined ? null : user.innerHTML = user_.toString() || 'error';
    }
  }
}

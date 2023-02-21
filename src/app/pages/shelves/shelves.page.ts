import { ShelfComponent } from './../../components/shelf/shelf.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ShelfService } from 'src/app/services/http/shelf.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { UserService } from 'src/app/services/http/user.service';
@Component({
  selector: 'app-shelves',
  templateUrl: './shelves.page.html',
  styleUrls: ['./shelves.page.scss'],
})
export class ShelvesPage implements OnInit {

  constructor(private shelfService: ShelfService, private userService: UserService, private modalCtr: ModalController) { }
  loaded = false;
  shelves: Array<any> = [];
  search_filter = 'all';
  tableStyle = 'light';
  notifications: any[] = [];
  filter = [
    { id: 1, name: 'All', type: 'all' },
    { id: 2, name: 'Name', type: 'name' },
    { id: 3, name: 'Ingredients', type: 'ingredients' },
    { id: 4, name: 'Shelf Number', type: 'number' },
  ]


  ngOnInit() {
    (async () => {
      await this.get_infos();
      await this.get_all_shelves();
    })();
  }

  search_shelf(event) {
    const table = document.getElementById('table');
    const not_found = document.getElementById('not-found');
    const search = event.target.value;

    if (search.trim() != '') {
      this.shelfService.search_shelf({ 'type': this.search_filter, 'value': search }).subscribe((data) => {
        this.shelves = data['response'];
        if (this.shelves.length == 0) {
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
              this.userService.logout();
            }
          } else {
            this.loaded = true;
            const label = not_found?.querySelector('ion-label');
            if (table != null && not_found != null && label != null) {
              table.className = 'transparent';
              label.innerHTML = 'Error Loading Shelves';
              not_found.className = 'show'
            }
          }
        });
    } else {
      console.log('empty');

      this.get_all_shelves();
    }
  }

  get_all_shelves() {
    const table = document.getElementById('table');
    const not_found = document.getElementById('not-found');
    this.shelfService.get_shelves().subscribe((data) => {
      this.shelves = data['response'];
      this.loaded = true;
      this.generateNotifications();
      if (this.shelves.length == 0) {
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
      this.generateNotifications('err');
      if (error.error.message == "Unauthenticated.") {
        this.userService.logout();
      } else {
        this.loaded = true;
        const label = not_found?.querySelector('ion-label');
        if (table != null && not_found != null && label != null) {
          table.className = 'transparent';
          label.innerHTML = 'Error Loading Shelves';
          not_found.className = 'show'
        }
      }
    });
  }

  async get_infos() {
    const shelves = document.getElementById('total_shelves_');
    const quantity = document.getElementById('total_quantity_');
    const user = document.getElementById('total_user_');
    await this.shelfService.get_info().subscribe((data) => {
      if (shelves != null && quantity != null) {
        shelves.innerHTML = data.response['total_shelves'];
        quantity.innerHTML = data.response['total_quantity'];
      }
    }, (error) => {
      if (error.error.message == "Unauthenticated.")
        this.userService.logout();
      else
        this.set_infos_value('err', 'err');
    }
    );
    await this.userService.info().subscribe((data) => {
      if (user != null)
        user.innerHTML = data.response['total_users'];
    },
      (error) => {
        if (error.error.message == "Unauthenticated.")
          this.userService.logout();
        else
          this.set_infos_value(undefined, undefined, 'err');
      });
  }

  refresh() {
    this.get_all_shelves();
    this.get_infos();
    this.generateNotifications();
  }

  on_change(event) {
    this.search_filter = event;
  }

  async show_modal(shelf, type: 'up' | 'add' | 'err') {
    if (type == 'err') {
    } else {
      const modal = await this.modalCtr.create({
        component: ShelfComponent,
        componentProps: { shelf: shelf, type: type, refresh: this.refresh.bind(this) },
      });
      return await modal.present();
    }
  }
  generateNotifications(err?: 'err') {
    this.notifications = [];
    if (err == 'err') {
      this.notifications.push({
        title: 'Error',
        message: `There was an error loading the notifications`,
        icon: 'alert-circle-outline',
        color: 'danger',
        type: 'err'
      });
    } else {
      this.shelves.forEach((shelf: any) => {
        if (shelf.quantity > 0 && shelf.quantity <= 5) {
          this.notifications.push({
            title: shelf.name,
            message: `You have ${shelf.quantity} items left on shelf ${shelf.number}`,
            icon: 'warning-outline',
            color: 'warning',
            shelf: shelf,
            type: 'up'
          });
        }
        else if (shelf.quantity == 0) {
          this.notifications.push({
            title: shelf.name,
            message: `You have no items left on shelf  ${shelf.number}`,
            icon: 'alert-circle',
            color: 'danger',
            shelf: shelf,
            type: 'up'
          });
        }
      }
      );
      if (this.notifications.length == 0) {
        this.notifications.push({
          title: 'No Notifications',
          message: `You have no notifications`,
          icon: 'checkmark-circle',
          color: 'success',
          type: 'err'
        });
      }
    }
  }

  set_infos_value(shelves_?: | number | 'err' | undefined, quantity_?: | number | 'err' | undefined, user_?: | number | 'err' | undefined) {
    const shelves = document.getElementById('total_shelves');
    const quantity = document.getElementById('total_quantity');
    const user = document.getElementById('total_user');
    if (shelves != null && quantity != null && user != null) {
      shelves_ == undefined ? null : shelves.innerHTML = shelves_.toString() || 'error';
      quantity_ == undefined ? null : quantity.innerHTML = quantity_.toString() || 'error';
      user_ == undefined ? null : user.innerHTML = user_.toString() || 'error';
    }
  }
}

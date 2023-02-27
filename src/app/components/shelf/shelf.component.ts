import { AlertService } from './../../services/alert.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ShelfService } from 'src/app/services/http/shelf.service';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true
})
export class ShelfComponent implements OnInit {
  @Input() shelf;
  @Input() type;
  @Input() refresh;
  btn;
  btn_del;
  title;
  number_disabled = false;
  constructor(private formBuilder: FormBuilder, private modalCtr: ModalController, private shelf_service: ShelfService, private alert: AlertService) { }
  form = this.formBuilder.group({
    name: [''],
    ingredients: [''],
    quantity: [''],
    number: ['']
  });
  ngOnInit() {
    this.btn = document.getElementById('btn');
    this.btn_del = document.getElementById('btn_del');
    this.title = document.getElementById('title');
    if (this.type == 'up') {
      this.btn.innerHTML = 'Update';
      this.title.innerHTML = this.shelf.name;
      this.number_disabled = true;
      this.form.patchValue({
        name: this.shelf.name,
        ingredients: this.shelf.ingredients,
        quantity: this.shelf.quantity,
        number: this.shelf.number
      });

    }
    else {
      this.btn.innerHTML = 'Add';
      this.title.innerHTML = 'Add Shelf';
      this.btn_del.style.display = 'none';
    }

  }

  dismiss() {
    this.modalCtr.dismiss();
  }
  submit() {
    if (this.form.value.name == "" || this.form.value.ingredients == "" || this.form.value.quantity == "" || this.form.value.number == "") {
      this.alert.presentAlert('Please Fill All Fields', "", "", ['ok']);
    }
    else {
      if (this.type == 'up') {
        this.shelf_service.update_shelf(this.form.value).subscribe(data => {
          if (data.error != undefined) {
            this.alert.presentToast(data.error, 3000, 'top', 'danger');
          }
          else {
            this.alert.presentToast('Shelf Successfully Updated', 3000, 'top', 'success');
            this.refresh();
          }
        }, error => {
          this.alert.presentToast('Error Updating Shelf', 3000, 'top', 'danger');
        });
      }
      else {
        this.shelf_service.add_shelf(this.form.value).subscribe(data => {
          if (data.error != undefined) {
            this.alert.presentToast(data.error, 3000, 'top', 'danger');
          }
          else {
            this.alert.presentToast('Shelf Successfully Added', 3000, 'top', 'success');
            this.refresh();
          }
        }, error => {
          this.alert.presentToast('Error Adding Shelf', 3000, 'top', 'danger');
        });
      }
    }
  }
  del() {
    this.shelf_service.delete_shelf(this.shelf.number).subscribe(data => {
      if (data.error != undefined) {
        this.alert.presentToast(data.error, 3000, 'top', 'danger');
      }
      else {
        this.alert.presentToast('Shelf Successfully Deleted', 3000, 'top', 'success');
        this.refresh();
        this.dismiss();
      }

    }, error => {
      this.alert.presentToast('Error Deleting Shelf', 3000, 'top', 'danger');
    });
  }
}

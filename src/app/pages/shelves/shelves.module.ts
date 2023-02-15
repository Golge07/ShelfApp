import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShelvesPageRoutingModule } from './shelves-routing.module';
import { ShelvesPage } from './shelves.page';
import { MenuComponent } from 'src/app/components/menu/menu.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShelvesPageRoutingModule,
    MenuComponent,
  ],
  declarations: [ShelvesPage]
})
export class ShelvesPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShelvesPageRoutingModule } from './shelves-routing.module';
import { ShelvesPage } from './shelves.page';
import { HeaderComponent} from 'src/app/components/header/header.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShelvesPageRoutingModule,
    HeaderComponent,
  ],
  declarations: [ShelvesPage]
})
export class ShelvesPageModule {}

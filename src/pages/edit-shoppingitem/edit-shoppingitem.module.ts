import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditShoppingitemPage } from './edit-shoppingitem';

@NgModule({
  declarations: [
    EditShoppingitemPage,
  ],
  imports: [
    IonicPageModule.forChild(EditShoppingitemPage),
  ],
})
export class EditShoppingitemPageModule {}

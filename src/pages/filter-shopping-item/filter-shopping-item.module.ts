import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterShoppingItemPage } from './filter-shopping-item';

@NgModule({
  declarations: [
    FilterShoppingItemPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterShoppingItemPage),
  ],
})
export class FilterShoppingItemPageModule {}

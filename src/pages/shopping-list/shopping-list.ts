import { Component } from '@angular/core';
import { NavController, NavParams,  ActionSheetController } from 'ionic-angular';
import { AddshoppingPage } from '../addshopping/addshopping';

import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { EditShoppingitemPage } from '../edit-shoppingitem/edit-shoppingitem';
// import { Subject } from 'rxjs/Subject';
import { FilterShoppingItemPage } from '../filter-shopping-item/filter-shopping-item';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private database: AngularFireDatabase,
    private actionSheet: ActionSheetController
  ) {
    //const userId$ = new Subject<string>();

    this.shoppingListRef$ = this.database.list('shopping-list');

    // this.shoppingListRef$ = this.database.list('shopping-list', {query: {
    //   orderByChild: 'itemNumber',
    //   equalTo: userId$
    // }});
    // this.shoppingListRef$.subscribe(user => console.log(user));
    // userId$.next('9');
  }

  selectShoppingItem(shoppingItem: ShoppingItem){
    this.actionSheet.create({
      title:`${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: ()=>{
            // Send the user to the EditShoppingItemPage and pass the 
            // key as a parameter
            this.navCtrl.push(EditShoppingitemPage , {shoppingItemId: shoppingItem.$key });
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: ()=>{
            this.shoppingListRef$.remove(shoppingItem.$key)
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: ()=>{
            console.log('user has selected has button')
          }
        }
      ]
    }).present();
  }
  navigateToAddShoppingPage(){
    //Navigate to AddShoppingPage
    this.navCtrl.push(AddshoppingPage); 
  }
  navigateToFilterShoppingItemPage(){
    this.navCtrl.push(FilterShoppingItemPage);
  }

}

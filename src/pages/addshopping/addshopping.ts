import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'page-addshopping',
  templateUrl: 'addshopping.html',
})
export class AddshoppingPage {

  shoppingItem = {} as ShoppingItem;
  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private database: AngularFireDatabase) {
       this.shoppingItemRef$ = this.database.list('shopping-list');
  }

  addShoppingItem(shoppingItem: ShoppingItem){
    /*
    Create a new anonymous object and convert itemNumber to a
    number.
    push this to our Firebase database under the 'shopping-list'
    node.
    */

    console.log(shoppingItem);
    this.shoppingItemRef$.push({
      itemName: this.shoppingItem.itemName,
      itemNumber: Number(this.shoppingItem.itemNumber)
    });
      //Reset our ShoppingItem
    this.shoppingItem = {} as ShoppingItem;
    //Navigate the user back to the shoppingListPage

    this.navCtrl.pop()
  }

  

}

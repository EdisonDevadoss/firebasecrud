import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'page-edit-shoppingitem',
  templateUrl: 'edit-shoppingitem.html',
})
export class EditShoppingitemPage {

  shoppingItemSubscription: Subscription;
  shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>;
  shoppingItem = {} as ShoppingItem;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase) {

      const shoppingItemId = this.navParams.get('shoppingItemId');
      
      //Log out the navParam
      console.log(shoppingItemId);

      //Set the scope of our Firebase Object equal to our selected item
      this.shoppingItemRef$ = this.database.object(`shopping-list/${shoppingItemId}`);

      //Subscribe to the Object and assign the result to this 
      //shoppingitem
      this.shoppingItemSubscription = 
       this.shoppingItemRef$.subscribe((shoppingItem)=>{
        this.shoppingItem = shoppingItem;
      });
  }
  editShoppingItem(shoppingItem: ShoppingItem){
    this.shoppingItemRef$.update(shoppingItem);

    this.navCtrl.pop();
  }

  ionViewWillLeave() {
    this.shoppingItemSubscription.unsubscribe();
  }

}

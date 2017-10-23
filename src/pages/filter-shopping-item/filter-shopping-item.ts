import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { Subject } from 'rxjs/Subject';
import { EditShoppingitemPage } from '../edit-shoppingitem/edit-shoppingitem';



@Component({
  selector: 'page-filter-shopping-item',
  templateUrl: 'filter-shopping-item.html',
})
export class FilterShoppingItemPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>;

  shoppingItem = {} as ShoppingItem;
  display = [];
  filterVal: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private database: AngularFireDatabase,
    private actionSheet: ActionSheetController) {

  }
  filterData(){
    let userName$ = new Subject<string>();
    
    this.shoppingListRef$ = this.database.list('shopping-list', {
      query:{
      orderByChild: 'itemName',
      equalTo: userName$
    }
    });
    this.shoppingListRef$.subscribe((data)=>{
      console.log(data);
      this.display = data;
    })
    userName$.next(this.filterVal);

  //   let val = this.filterVal;
  //   if (val && val.trim() != '') {
  //   this.display = this.display.filter((item)=>{
  //     return (item);
  //   })
  // }
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterShoppingItemPage');
  }

}

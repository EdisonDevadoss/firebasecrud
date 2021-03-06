import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2'; 
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';

import { FIREBASE_CREDENTIALS } from './firebase.credentials';
import { AddshoppingPage } from '../pages/addshopping/addshopping';
import { EditShoppingitemPage } from '../pages/edit-shoppingitem/edit-shoppingitem';
import { FilterShoppingItemPage } from '../pages/filter-shopping-item/filter-shopping-item';

@NgModule({
  declarations: [
    MyApp,
    ShoppingListPage,
    AddshoppingPage,
    EditShoppingitemPage,
    FilterShoppingItemPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //Initialise AngularFire with credientials from the dashboard
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    //Import the AngularFireDatabaseModule to use database interaction
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShoppingListPage,
    AddshoppingPage,
    EditShoppingitemPage,
    FilterShoppingItemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

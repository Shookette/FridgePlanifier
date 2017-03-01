import { Component } from '@angular/core';
import { BarcodeScanner } from 'ionic-native';

import { NavController, Platform, AlertController } from 'ionic-angular';
import { ScanProduct } from '../scanProduct/scanProduct';
import { ProductService } from '../../shared/services/productService';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ProductService]
})
export class HomePage {
  public products: Array<Object> = [];
  protected minDate: any;

  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private alertCtrl: AlertController,
    private productServ: ProductService
  ) {
    // @todo use directly products array in productServ and don't do a copy
    this.products = productServ.products;
    this.minDate = moment().format("YYYY-MM-D");
    // @todo remove this test or only in desktop mod
    this.products = [
      {
        id: 1,
        name: 'toto',
        expirationDate: '2017-10-03'
      },
      {
        id: 2,
        name: 'toto',
        expirationDate: '2017-10-03'
      },
      {
        id: 3,
        name: 'toto',
        expirationDate: '2017-10-03'
      },
      {
        id: 4,
        name: 'toto',
        expirationDate: '2017-10-03'
      }
    ];
  }

  protected scanProduct() {
    // Todo when scanning is OK then redirect on scanProduct with params if set without else
    // If param is set, then do a WGET request else add product manually 
    // Add product to database latter ?
    // Add all scanned or entered product in sqlbase to be get later
    this.platform.ready().then(() => {
      BarcodeScanner.scan().then((result) => {
        this.navCtrl.push(ScanProduct, {
          codeBar: result.text
        });
      }).catch((error) => {
        this.navCtrl.setRoot(ScanProduct);
      });
    });
  }

  protected addProduct() {
    this.navCtrl.setRoot(ScanProduct);
  }

  protected removeProduct(id) {
    this.productServ.deleteProduct(id);
  }

  protected remainingTime(date) {
    return moment(moment(date).diff(moment())).format('D');
  }

}

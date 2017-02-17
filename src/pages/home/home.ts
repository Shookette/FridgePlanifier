import { Component } from '@angular/core';
import { BarcodeScanner } from 'ionic-native';

import { NavController, Platform, AlertController } from 'ionic-angular';
import { ScanProduct } from '../scanProduct/scanProduct';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private alertCtrl: AlertController
  ) {
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

}

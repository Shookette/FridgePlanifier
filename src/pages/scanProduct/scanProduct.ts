import { Component } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { OpenFactFoodService } from '../../shared/services/openFactFoodService'

@Component({
  selector: 'page-scan-product',
  templateUrl: 'scanProduct.html',
  providers: [OpenFactFoodService]
})
export class ScanProduct {
  protected codeBar: string;

  constructor(
    protected navCtrl: NavController,
    protected alertCtrl: AlertController,
    protected params:NavParams,
    protected OpenFactFoodService: OpenFactFoodService
    ) {
      this.codeBar = this.params.get('codeBar');
      this.codeBar = "5000159409179";
  }

  ionViewWillEnter() {
    if (this.codeBar) {
      // Call OpenFactFood Api
      this.OpenFactFoodService.searchProduct(this.codeBar).then((res) => {
        console.log(res);
        let expirationDate: string, today = new Date();
        console.log('today', `${today.getFullYear()}/${today.getMonth()}/${today.getDay()}`);
        today.setDate(today.getDate() + 3);
        expirationDate = `${today.getFullYear()}/${today.getMonth()}/${today.getDay()}`;
        console.log('expirationDate', expirationDate);
        this.alertCtrl.create({
          title: 'Enter the expiration date',
          message: `<h2>${res.product.product_name}</h2><br /><img src="${res.product.image_small_url}" />`,
          inputs: [
            {
              name: 'expirationDate',
              placeholder: 'dd/mm/yyyy',
              value: expirationDate,
              type: 'date'
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
                this.navCtrl.setRoot(HomePage);
              }
            },
            {
              text: 'Validate',
              handler: data => {
                // Insert in BDD the expirationDate
                console.log(data.expirationDate)
                this.navCtrl.setRoot(HomePage);
              }
            }
          ]
        }).present();
      })
    } else {
      // Ask user to enter manually product
      this.alertCtrl.create({
        title: "Attention!",
        subTitle: "Barcode not found",
        buttons: ["Close"]
      }).present();
    }
  }

  protected returnHome() {
    this.navCtrl.setRoot(HomePage);
  }

}

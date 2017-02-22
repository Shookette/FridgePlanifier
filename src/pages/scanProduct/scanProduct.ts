import { Component } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { OpenFactFoodService } from '../../shared/services/openFactFoodService'
import { ProductService } from '../../shared/services/productService'
import * as moment from 'moment';

@Component({
  selector: 'page-scan-product',
  templateUrl: 'scanProduct.html',
  providers: [OpenFactFoodService, ProductService]
})
export class ScanProduct {
  protected codeBar: string;
  protected formData: any;
  protected minDate: any;

  constructor(
    protected navCtrl: NavController,
    protected alertCtrl: AlertController,
    protected params:NavParams,
    protected OpenFactFoodService: OpenFactFoodService,
    protected ProductService: ProductService,
    ) {
      this.codeBar = this.params.get("codeBar");
      // this.codeBar = "5000159409179";
      this.formData = {};
      this.minDate = moment().format("YYYY");
  }

  ionViewWillEnter() {
    if (this.codeBar) {
      // Call OpenFactFood Api
      this.OpenFactFoodService.searchProduct(this.codeBar).then((res) => {
        if (res !== undefined && res !== null) {
          if (res.product !== undefined && res.product !== null) {
            this.alertCtrl.create({
              title: 'Enter the expiration date',
              message: `<h2>${res.product.product_name}</h2><br /><img src="${res.product.image_small_url}" />`,
              inputs: [
                {
                  name: 'expirationDate',
                  placeholder: 'dd-mm-yyyy',
                  value: moment().format("YYYY-MM-DD"),
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
                    this.ProductService.insertProduct({
                      name: res.product.product_name,
                      expirationDate: data.expirationDate
                    });
                    this.navCtrl.setRoot(HomePage);
                  }
                }
              ]
            }).present();
          } else {
            // TODO enhance system
            this.codeBar = null;
          }
        } else {
          // TODO enhance system
          this.codeBar = null;
        }
      })
    }
  }

  protected returnHome() {
    this.navCtrl.setRoot(HomePage);
  }

  protected insertProduct() {
    if (this.formData.productName && this.formData.expirationDate) {
      this.ProductService.insertProduct({
        name: this.formData.productName,
        expirationDate: this.formData.expirationDate
      });
      this.navCtrl.setRoot(HomePage);
    }
  }

}

import { Component } from '@angular/core';
import { SQLite } from 'ionic-native';
import { Platform } from 'ionic-angular';
import * as moment from 'moment';
import {TranslateService} from 'ng2-translate';

@Component({
    providers: []
})
export class ProductService {  
  public products: Array<Object> = [];
  private db: SQLite;
  constructor(
    private platform: Platform,
    private translate: TranslateService
  ) {
    this.platform.ready().then(() => {
        this.db = new SQLite();
        this.db.openDatabase({
          name: "fridgePlannifier.db",
          location: "default"
        }).then(() => {
            this.refresh();
        }, (error) => {
            console.error("ERROR: ", error);
        });
    });
  }

  /**
   * 
   * 
   * @param {*} product 
   * 
   * @memberOf ProductService
   */
  public insertProduct(product: any): void {
    this.db.executeSql("INSERT INTO product (name, expirationDate) VALUES (?, ?)", [product.name, product.expirationDate]).then((data) => {
      let newProduct = {
        id: data.insertId,
        name: product.name,
        expirationDate: product.expirationDate
      }
      this.products.push(newProduct);
      console.debug("INSERTED: " , newProduct);
    }).catch((error) => {
      console.error("ERROR: " , error.err);
    });
  }

  /**
   * 
   * 
   * @param {*} product 
   * 
   * @memberOf ProductService
   */
  public deleteProduct(id: Number): void {
    this.db.executeSql("DELETE FROM product where id = ?", [id]).then(() => {
      this.products = this.products.filter(function (el) {
        return el['id'] !== id;
      });
    }).catch((error) => {
      console.error("ERROR: ", error);
    });
  }

  /**
   * 
   * 
   * 
   * @memberOf ProductService
   */
  public refresh(): void {
    this.db.executeSql("SELECT * FROM product ORDER BY expirationDate ASC", []).then((data) => {
      console.log("DATA BEFORE RENDERING::", data);
      if(data.rows.length > 0 && this.products !== []) {
        for(var i = 0; i < data.rows.length; i++) {
          this.products.push({
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,
            expirationDate: data.rows.item(i).expirationDate
          });
        }
      }
      console.debug("PRODUCTS::", this.products);
    }, (error) => {
      console.error("ERROR: " , error);
    });
  }

  /**
   * Return remainingTime from date argument 
   * 
   * @protected
   * @param {string} date 
   * @returns {string} 
   * 
   * @memberOf ProductService
   */
  protected remainingTime(date: string): string {
    let diff = moment(moment(date).diff(moment()));
    let remainingTime;
    if (parseInt(diff.format('D')) >= 14) {
      this.translate.get('peremption.twoweek').subscribe((res: string) => {
        remainingTime = res;
      });
    } else if (parseInt(diff.format('D')) > 1) {
      this.translate.get('peremption.oneweek', {nbday: diff.format('D')}).subscribe((res: string) => {
        remainingTime = res;
      });
    } else {
      if (parseInt(diff.format('H')) >= 0) {
        this.translate.get('peremption.today').subscribe((res: string) => {
          remainingTime = res;
        });
      } else {
        this.translate.get('peremption.already').subscribe((res: string) => {
          remainingTime = res;
        });
      }
    }
    return remainingTime;
  }

}
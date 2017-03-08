import { Component } from '@angular/core';
import { SQLite } from 'ionic-native';
import { Platform } from 'ionic-angular';
import * as moment from 'moment';

@Component({
    providers: []
})
export class ProductService {  
  public products: Array<Object> = [];
  private db: SQLite;
  constructor(
    private platform: Platform
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

  public deleteProduct(product: any): void {
    this.db.executeSql("DELETE FROM product where id = ?", [product.id]).then(() => {
      // TODO array.slice (pop product from products array)
    }).catch((error) => {
      console.error("ERROR: ", error);
    });
  }

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

  protected remainingTime(date: string): string {
    let diff = moment(moment(date).diff(moment()));
    if (parseInt(diff.format('D')) >= 14) {
      return "Perimé dans plus de 2 semaines";
    } else if (parseInt(diff.format('D')) > 1) {
      return `Perimé dans ${diff.format('D')} jour(s)`;
    } else {
      if (parseInt(diff.format('H')) >= 0) {
        return `Perimé aujourd'hui`;
      } else {
        return 'Perimé';
      }
    }
  }

}
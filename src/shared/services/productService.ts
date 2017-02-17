import { Component } from '@angular/core';

@Component({
    providers: []
})
export class ProductService {  
  public products: Array<Object> = [];
  constructor(
  ) {
  }

  // Todo replance Array<any> by Array<product> and do proper types
  public getProductDay(): Array<any> {
    return;
  }

  // Todo replance Array<any> by Array<product> and do proper types
  public getProductTomorrow(): Array<any> {
    return;
  }

  // Todo replance Array<any> by Array<product> and do proper types
  public getProductWeek(): Array<any> {
    return;
  }

  // Todo replance Array<any> by Array<product> and do proper types
  public getProductLater(): Array<any> {
    return;
  }

  public getExpiredProduct(): Array<any> {
    return;
  }

  public insertProduct(product: any): void {

  }

  public deleteProduct(product: any): void {

  }


}
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import 'rxjs/Rx';

@Component({
    providers: [Http]
})
export class OpenFactFoodService {  
    constructor(
      private http:Http
    ) {
    }
  
    searchProduct(barCode) {
        var url = `https://fr.openfoodfacts.org/api/v0/produit/${encodeURI(barCode)}`;
        return this.http.get(url)
          .toPromise()
          .then(res => res.json())
          .catch(err => console.error(err));
    }
}
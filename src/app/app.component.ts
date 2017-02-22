import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite } from 'ionic-native';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(public platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      // Init the DB
      let db = new SQLite();
      db.openDatabase({
        name: "fridgePlannifier.db",
        location: "default" // the location field is required
      }).then(() => {
        /**
         * Create product table if not EXISTS
         * product table containt 3 attributes, id, name and expirationDate
         * @todo see how to add picture in BD
         */
        db.executeSql("CREATE TABLE IF NOT EXISTS product(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, expirationDate TEXT)", {}).then((data) => {
          console.debug("TABLE CREATED: ", data);
        }).catch((err) => {
          console.error("Unable to execute sql: ", err);
        });
      }).catch((err) => {
        console.error("Unable to open database: ", err);
      });
    });
  }
}

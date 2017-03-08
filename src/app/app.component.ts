import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import {TranslateService} from 'ng2-translate';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage: any = HomePage;
  

  constructor(
    public platform: Platform,
    public translate: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('fr');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('fr');

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

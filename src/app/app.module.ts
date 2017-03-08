import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ScanProduct } from '../pages/scanProduct/scanProduct';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { Http } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ScanProduct,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
     TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
        deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ScanProduct
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

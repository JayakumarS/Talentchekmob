import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/file/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { TranslatePipe } from './translate.pipe';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

//import { FCM } from '@ionic-native/fcm/ngx';

import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

import { FileChooser } from '@ionic-native/file-chooser/ngx';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { DatePipe } from '@angular/common';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Sim } from '@ionic-native/sim/ngx';
import { CKEditorModule } from 'ckeditor4-angular';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
  
}

@NgModule({

 
 // providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
 // bootstrap: [AppComponent],
  declarations: [AppComponent, TranslatePipe],
  entryComponents: [],
  imports: [
  
    ReactiveFormsModule, FormsModule,
    HttpClientModule,  
    BrowserModule,
    
    IonicModule.forRoot(), AppRoutingModule, CKEditorModule,
    Ng2GoogleChartsModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(), AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
   
  ],

  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    FileOpener,
    FileTransfer,
    FileTransferObject,
    FileChooser,
    DocumentViewer,
    SMS,
    SocialSharing,
    NativeStorage,
    LocalNotifications,
    UniqueDeviceID,
    AndroidPermissions,
    Sim,
    BarcodeScanner,
    DatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

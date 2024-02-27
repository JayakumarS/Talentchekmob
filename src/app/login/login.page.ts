import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { StorageService } from '../storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, PopoverController } from '@ionic/angular';

import { Platform } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';

import { AppVersion } from '@ionic-native/app-version/ngx';




declare var google;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {

  @ViewChild('slider', { static: true }) private slider: IonSlides;


  public slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  mobVersion: any;

  //#region Declaration

  //#endregion

  //#region Constructor
  constructor(public formbuilder: FormBuilder, public router: Router, 
     private platform: Platform,private storageservice: StorageService,private appVersion: AppVersion) {

    
    

    this.platform.ready().then(() => {
      if (this.platform.is("cordova")) {
        
      }
  });

 

  }
  //#endregion
  public async ionSlideDidChange(): Promise<void> {
    const index = await this.slider.getActiveIndex();

  }

  ngOnInit() {
    this.slider.startAutoplay().then(()=>{})
  }

  signUp(){
    this.router.navigate(['/hello-dear']) 
  }


  checkLatestMobileAppVersionAndGiveAlert() {
    
    var getMobileAppVersionUrl = "/hrms/master/employeeAdminMaster/getLatestMobileAppVersionMob";
    this.storageservice.getrequest(getMobileAppVersionUrl).subscribe(resultVersion => {
      var responseVersion = resultVersion;
      console.log("responseVersion: " + responseVersion);

      let latestMobileAppVersion = resultVersion['latestMobileAppVersion'];
      console.log(latestMobileAppVersion);

       // Get the current installed app version
  this.appVersion.getVersionNumber().then((currentAppVersion) => {
    this.storageservice.successToast('Ver: '+ currentAppVersion)  
    this.mobVersion=currentAppVersion;
  });

      if (latestMobileAppVersion != this.mobVersion) {
        this.storageservice.GeneralAlertCustom('Discover new version ' + latestMobileAppVersion, 
        'Latest version ' + latestMobileAppVersion + ' is available in play store now, Would you like to update?',
        'Update now', 'Not now');
      }
    },

      () => {

      });
    //#endregion
  }


  //#endregion  

}

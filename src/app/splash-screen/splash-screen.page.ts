import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  roleId: any;
  mobVersion: any;

  constructor(private router: Router, public storageservice: StorageService,private appVersion: AppVersion,) {



    var idobj = localStorage.getItem("userId");
    var pwdObj = localStorage.getItem("access");
    if (idobj != null && pwdObj != null) {
      console.log('Id s-c: ', idobj);
      console.log('Pwd s-c: ', pwdObj);
      this.roleId = localStorage.getItem("roleId");
      //#region Check latest application version and give alert to user

      //#endregion


      //Set IsFloatingScript flag to empty for the 'Connection' form.
      localStorage.setItem("IsFloatingScript", "");

      if (this.roleId.includes('1')) {
        this.router.navigate(['/home']);
      } else if (this.roleId.includes('2')) {
        this.router.navigate(['/organization-dashboard']);
      } else if (this.roleId.includes('3')) {
        this.router.navigate(['/institution-dashboard']);
      }
      else if (this.roleId.includes('5')) {
        this.router.navigate(['/job-search']);
      }
    }
    else {
      this.router.navigate(['/login'])
    }
  }

  ngOnInit() {


    this.checkLatestMobileAppVersionAndGiveAlert();
  }



  checkLatestMobileAppVersionAndGiveAlert() {
    //#region Check latest application version and give alert to user
    var getMobileAppVersionUrl = "api/auth/app/mobile/getLatestMobileAppVersionMob";
    this.storageservice.getrequest(getMobileAppVersionUrl).subscribe(resultVersion => {
      var responseVersion = resultVersion;
      console.log("responseVersion: " + responseVersion);

      let latestMobileAppVersion = resultVersion['latestMobileAppVersion'];
      console.log(latestMobileAppVersion);

      // Get the current installed app version
  this.appVersion.getVersionNumber().then((currentAppVersion) => {
   // this.storageservice.successToast('Vers: '+ currentAppVersion)  
   // this.mobVersion=currentAppVersion;
   if (latestMobileAppVersion != currentAppVersion) {
    this.storageservice.GeneralAlertCustom('Discover new version ' + latestMobileAppVersion,
      'Latest version ' + latestMobileAppVersion + ' is available in play store now, Would you like to update?',
      'Update now', 'Not now');
  }
  });

      // if (latestMobileAppVersion != this.mobVersion) {
      //   this.storageservice.GeneralAlertCustom('Discover new version ' + latestMobileAppVersion,
      //     'Latest version ' + latestMobileAppVersion + ' is available in play store now, Would you like to update?',
      //     'Update now', 'Not now');
      // }
    },
      error => {
        console.log(`Error data: ${JSON.stringify(error)}`);
        if (error.name == "HttpErrorResponse") {
          this.storageservice.warningToast('Internet connection problem, Pls check your internet.');
          this.storageservice.GeneralAlert('HttpErrorResponse', 'Internet connection problem, Pls check your internet.');
        }
        else {
          this.storageservice.warningToast('Error: ' + error.message);
        }
      },
      () => {

      });

  }


}
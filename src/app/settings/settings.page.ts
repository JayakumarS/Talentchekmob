import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { StorageService } from '../storage.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public router:Router,public storageservice: StorageService,public nativeStorage: NativeStorage) { }

  ngOnInit() {
  }

  selectedTab: string = 'menu';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }
  
 

  goto_language(){
    this.router.navigate(['/language']);
  }
  goto_messages(){
    this.router.navigate(['/push-notification']); 
  }
  goto_policy(){
    this.router.navigate(['/privacy-policy']); 
  }
  goto_Terms(){
    this.router.navigate(['/terms-and-conditions']); 
  }
  goto_AboutApp(){
    this.router.navigate(['/about-device']); 
  }
  goto_visibility(){
    this.router.navigate(['/visibility']);
  }

  goto_subscribe(){
    this.router.navigate(['/subscription-individual']);

  }

  logOut() {

    localStorage.setItem("userId", "");
    localStorage.setItem("userName", "");
    localStorage.setItem("creditPoints", "");
    localStorage.setItem("empId", "");
    localStorage.setItem("email", "");
    localStorage.setItem("userRefFlag", "");
    localStorage.setItem("isloggedIn", "");
    localStorage.setItem("TC_Id", "");
    localStorage.setItem("TC_Pwd", "");
    localStorage.setItem("FCMToken", "");

    localStorage.setItem("userRefFlag", "");
    localStorage.setItem("categoryflag", "");
    localStorage.setItem("IsFloatingScript", "");

    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("creditPoints");
    localStorage.removeItem("empId");
    localStorage.removeItem("email");
    localStorage.removeItem("userRefFlag");
    localStorage.removeItem("isloggedIn");
    localStorage.removeItem("TC_Id");
    localStorage.removeItem("TC_Pwd");
    localStorage.removeItem("FCMToken");
    localStorage.removeItem("IsFloatingScript");

    this.storageservice.publishSomeData({
      status_get: false
    });
    localStorage.clear();

    this.nativeStorage.clear();

    //this.router.navigate(['/login']);
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }


 // footer
goto_profileSearch(){
  this.router.navigate(['/job-search']);
}
goto_jobs(){
  this.router.navigate(['/job']);
}
goto_home(){
  this.router.navigate(['/home']);
}
goto_profile(){
  this.router.navigate(['/profile-view']);
}
goto_more(){
  this.router.navigate(['/settings']);
}
 




}

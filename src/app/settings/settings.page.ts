import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { StorageService } from '../storage.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  roleId: string;
  RoleID: string[];

  constructor(public router: Router, public storageservice: StorageService, public nativeStorage: NativeStorage) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/settings') {
        this.setSelectedTab('menu');
      }
    });
    this.roleId = localStorage.getItem("roleId");
    this.RoleID = this.roleId.split(",", 3);
  }

  //nav bar
  selectedTab: string = 'menu';
  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }


  //settings button navigation
  goto_oniSubscription() {
    this.router.navigate(['subscription-insorg'])
  }
  goto_language() {
    this.router.navigate(['/language']);
  }
  goto_messages() {
    this.router.navigate(['/push-notification']);
  }
  goto_policy() {
    this.router.navigate(['/privacy-policy']);
  }
  goto_Terms() {
    this.router.navigate(['/terms-and-conditions']);
  }
  goto_AboutApp() {
    this.router.navigate(['/about-device']);
  }
  goto_visibility() {
    this.router.navigate(['/visibility']);
  }

  goto_consent() {
    this.router.navigate(['/consent-form'])
  }

  goto_subscribe() {
    this.router.navigate(['/subscription-individual']);

  }
  goto_scantoconnect() {
    this.router.navigate(['/scan-to-connect']);
  }

  goto_alumni() {
    this.router.navigate(['/oni-alumni']);
  }

  goto_Indiv_alumni() {
    this.router.navigate(['/indiv-alumni']);
  }

  //logout function
  logOut() {
    localStorage.clear();
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
    localStorage.removeItem('selectedLang');

    this.storageservice.publishSomeData({
      status_get: false
    });
    localStorage.clear();
    this.nativeStorage.clear();
    if (window && window.caches) {
      caches.keys().then(function (names) {
        for (let name of names)
          caches.delete(name);
      });
    }
    this.router.navigateByUrl('/sign-in', { replaceUrl: true });
  }


  // footer
  goto_profileSearch() {
    this.router.navigate(['/job-search']);
  }
  goto_jobs() {
    this.router.navigate(['/job']);
  }
  goto_instijobs() {

    this.router.navigate(['/oni-job-post-list']);
  }
  goto_orgjobs() {

    this.router.navigate(['/oni-job-post-list']);
  }
  goto_home() {
    this.router.navigate(['/home']);
  }
  goto_orghome() {

    this.router.navigate(['/organization-dashboard']);
  }
  goto_instihome() {
    this.router.navigate(['/institution-dashboard']);

  }
  goto_instiprofile() {

    this.router.navigate(['/insti-profile-view']);
  }
  goto_orgprofile() {

    this.router.navigate(['/org-profile-view']);
  }
  goto_profile() {
    this.router.navigate(['/profile-view']);
  }
  goto_more() {
    this.router.navigate(['/settings']);
  }

goto_DeleteAccount(){
  this.router.navigate(['/delete-my-account'])
}

goto_visibility1(id: number) {
  localStorage.setItem('itemKey', id.toString());
  this.router.navigate(['/visibility']);
}
 
}

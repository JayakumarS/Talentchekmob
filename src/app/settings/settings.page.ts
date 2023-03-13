import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }
  
  goto_profile(){
    this.router.navigate(['/profile']) 
  }

  goto_language(){
    this.router.navigate(['/language']) 
  }
  goto_messages(){
    this.router.navigate(['/push-notification']) 
  }
  goto_policy(){
    this.router.navigate(['/privacy-policy']) 
  }
  goto_Terms(){
    this.router.navigate(['/terms-and-conditions']) 
  }
  goto_AboutApp(){
    this.router.navigate(['/about-device']) 
  }

}

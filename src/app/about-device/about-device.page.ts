import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-about-device',
  templateUrl: './about-device.page.html',
  styleUrls: ['./about-device.page.scss'],
})
export class AboutDevicePage implements OnInit {
  selectedLang: string;

  constructor(public router:Router,public languageService:LanguageService) { }

  ngOnInit() {
    this.selectedLang  = localStorage.getItem('selectedLang');
    this.languageService.setLanguage(this.selectedLang);
    
  }

  //nav bar
  selectedTab: string = 'menu'; 
  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

  //back button
  goto_settings(){
    this.router.navigate(['/settings']) 
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

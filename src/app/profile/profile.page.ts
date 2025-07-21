import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router'; 
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  selectedLang: string;
  updateData() {
    throw new Error('Method not implemented.');
  } 

  constructor(public router:Router,public languageService:LanguageService) { }

  ngOnInit() {
    this.selectedLang  = localStorage.getItem('selectedLang');
    this.languageService.setLanguage(this.selectedLang);
  }

  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

  settings(){
    this.router.navigate(['/settings']) 
  }

  support(){
    this.router.navigate(['/support']) 
  }
  goto_signup(){
    
  }


}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {

  languages = [];
  selected = '';

  constructor(public router:Router, private languageService: LanguageService ) { }

  ngOnInit() {

    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected;
  }
  selectedTab: string = 'menu';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

  select(lng) {
    this.languageService.setLanguage(lng);
    this.router.navigate(['/settings']);
  }

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

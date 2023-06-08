import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-apply-for-job',
  templateUrl: './apply-for-job.page.html',
  styleUrls: ['./apply-for-job.page.scss'],
})
export class ApplyForJobPage implements OnInit {
  selectedLang: string;

  constructor(public router: Router,public languageService:LanguageService) { }

  ngOnInit() {
    this.selectedLang  = localStorage.getItem('selectedLang');
    this.languageService.setLanguage(this.selectedLang);
  }
  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }
  Apply(){

    this.router.navigate(['/job']); 

  }

  go_to_jobs(){
    this.router.navigate(['/job']);
  }
}

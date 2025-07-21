import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-awesome',
  templateUrl: './awesome.page.html',
  styleUrls: ['./awesome.page.scss'],
})
export class AwesomePage implements OnInit {
  emailId: any;
  emailContentFlag:boolean=false;
  selectedLang: string;

  constructor(public router:Router,public languageService:LanguageService) { }

  ngOnInit() {

    this.selectedLang  = localStorage.getItem('selectedLang');
    this.languageService.setLanguage(this.selectedLang); 

    this.emailId=localStorage.getItem("emailId") ;
    console.log(this.emailId)
    if(this.emailId=='')
    {
      this.emailContentFlag=true;
    }
    else
    {
      this.emailContentFlag=false;
    }

  }

  goto_signup(){
    this.router.navigate(['sign-in']);
      }
    
      goto_login(){
    
        this.router.navigate(['sign-in']);
      }

}

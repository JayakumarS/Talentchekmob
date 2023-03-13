import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-hello-dear',
  templateUrl: './hello-dear.page.html',
  styleUrls: ['./hello-dear.page.scss'],
})
export class HelloDearPage implements OnInit {

  signUpButtons:boolean=false;
  individualCard:boolean=false;
  institutionalCard:boolean=false;
  organizationCard:boolean=false;

  constructor(public router:Router) { }

  ngOnInit() {
  }

  goto_signup(sign:any){
    if(sign=='sign'){
      this.signUpButtons=true;
      this.individualCard=false;
      this.institutionalCard=false;
      this.organizationCard=false;
    }
  }

  individualClick(individualClick:any){
    if(individualClick=='individual'){
      this.individualCard=true;
      this.signUpButtons=false;
    }else{
      this.individualCard=false;
    }
  }

  institutionalClick(institutionalClick:any){
    if(institutionalClick=='institutional'){
      this.institutionalCard=true;
      this.signUpButtons=false;
      this.individualCard=false;
    }else{
      this.institutionalCard=false;
    }
  }

  organizationClick(organizationClick:any){
    if(organizationClick=='organization'){
      this.organizationCard=true;
      this.signUpButtons=false;
      this.individualCard=false;
      this.institutionalCard=false;
    }else{
      this.organizationCard=false;
    }
  }

  individualRegister(){
    this.router.navigate(['/sign-up']);
    this.individualCard=false;
    this.institutionalCard=false;
    this.organizationCard=false;
    this.signUpButtons=false;
  }

  organizationRegister(){
    this.router.navigate(['/sign-up-organization']);
    this.individualCard=false;
    this.institutionalCard=false;
    this.organizationCard=false;
    this.signUpButtons=false;
  }

  institutionRegister(){
    this.router.navigate(['/sign-up-institution']);
    this.individualCard=false;
    this.institutionalCard=false;
    this.organizationCard=false;
    this.signUpButtons=false;
  }

}

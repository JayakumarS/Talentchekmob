import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-awesome',
  templateUrl: './awesome.page.html',
  styleUrls: ['./awesome.page.scss'],
})
export class AwesomePage implements OnInit {
  emailId: any;
  emailContentFlag:boolean=false;

  constructor(public router:Router) { }

  ngOnInit() {

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

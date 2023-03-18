import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-cat',
  templateUrl: './register-cat.page.html',
  styleUrls: ['./register-cat.page.scss'],
})
export class RegisterCatPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  individualRegister(){
    this.router.navigate(['/sign-up']);
  }

  institutionRegister(){
    this.router.navigate(['/sign-up-institution']); 
  }

  organizationRegister(){
    this.router.navigate(['/sign-up-organization']);
  }

  go_back(){
    this.router.navigate(['/hello-dear']);
  }

  goto_login(){

    this.router.navigate(['/sign-in']); 
  }

}

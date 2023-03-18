import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-awesome',
  templateUrl: './awesome.page.html',
  styleUrls: ['./awesome.page.scss'],
})
export class AwesomePage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  goto_signup(){
    this.router.navigate(['sign-in']);
      }
    
      goto_login(){
    
        this.router.navigate(['sign-in']);
      }

}

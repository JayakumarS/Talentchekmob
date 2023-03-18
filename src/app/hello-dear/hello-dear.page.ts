import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-hello-dear',
  templateUrl: './hello-dear.page.html',
  styleUrls: ['./hello-dear.page.scss'],
})
export class HelloDearPage implements OnInit {


  constructor(public router:Router) { }

  ngOnInit() {

  }

  goto_signup(){
this.router.navigate(['register-cat'])
  }

  goto_login(){

    this.router.navigate(['sign-in']);
  }

}

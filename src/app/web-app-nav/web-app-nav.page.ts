import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-app-nav',
  templateUrl: './web-app-nav.page.html',
  styleUrls: ['./web-app-nav.page.scss'],
})
export class WebAppNavPage implements OnInit {

  public roleId:any;
  public RoleID:any;

  constructor(public router :Router) {

    
   }

  ngOnInit() {

    this.roleId = localStorage.getItem("roleId");
    this.RoleID =  this.roleId.split(",", 3);
  }


  home(){

    if(this.roleId.includes('2')){

      this.router.navigate(['/organization-dashboard']);
    }
    else if(this.roleId.includes('3')){
      this.router.navigate(['/institution-dashboard'])
    }
  }



}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  //#region Declaration
  data: any;
  //#endregion

  //#region Constructor
  constructor(public router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.data = params;
      }
    });
  }
  //#endregion

  //#region OnInit
  ngOnInit() {
  }
  //#endregion

  //#region Button click events
  goto_login() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        empId: this.data.empId
      }
    };
    this.router.navigate(['/login'], navigationExtras);
    //this.router.navigate(['/login'])
  }
  //#endregion

}

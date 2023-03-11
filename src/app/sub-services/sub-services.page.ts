import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sub-services',
  templateUrl: './sub-services.page.html',
  styleUrls: ['./sub-services.page.scss'],
})
export class SubServicesPage implements OnInit {
 
  //#region Declaration
  constructor(public router:Router) { }
  //#endregion

  //#region OnInit
  ngOnInit() {
  }
  //#endregion

  //#region Button events
  goto_set(){
    this.router.navigate(['/seriveslist'])
  }
  //#endregion
}

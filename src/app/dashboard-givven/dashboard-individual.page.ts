import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { PopoverController } from '@ionic/angular';
import { LanguageService } from '../language.service';
import { TranslateService } from '@ngx-translate/core';
import { Sim } from '@ionic-native/sim/ngx';

@Component({
  selector: 'app-dashboard-individual',
  templateUrl: './dashboard-individual.page.html',
  styleUrls: ['./dashboard-individual.page.scss'],
})
export class DashboardIndividualPage implements OnInit {

  userName: string;
  
  constructor(public router: Router, private popoverController: PopoverController, private languageService: LanguageService,
    private translate: TranslateService, private sim: Sim) { 

      if (!this.languageService.selectedLang) {
        this.languageService.setInitialAppLanguage();
      }

    this.userName = localStorage.getItem("userName");
    
    //#region To get Sim card ReadPermission
    this.sim.requestReadPermission().then(
      () => console.log('Permission granted'),
      () => console.log('Permission denied')
    );

    this.sim.hasReadPermission().then(
      (info) => console.log(`Has permission: ${JSON.stringify(info)}`)
    );    
    //#endregion

  }

  ngOnInit() {
    this.translate.setDefaultLang('en');
  }


  goto_gtrack(){

    this.router.navigate(['/g-track']) 
  }

  goto_Container_track(){
    this.router.navigate(['/yettostart'])
  }

  
  goto_callentry(){
    this.router.navigate(['/call-entry-customer-search'])
  }

  goto_airfreight(){
    this.router.navigate(['/yettostart'])

  }
 

  goto_KMPortal(){
    this.router.navigate(['/yettostart'])
  }
  goto_Alumni(){
    this.router.navigate(['/yettostart'])
  }

  goto_ProfileSearch() {
    this.router.navigate(['/yettostart'])
  }

 

}

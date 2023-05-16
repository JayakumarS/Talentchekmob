import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { LanguagePopoverPage } from '../language-popover/language-popover.page';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-hello-dear',
  templateUrl: './hello-dear.page.html',
  styleUrls: ['./hello-dear.page.scss'],
})
export class HelloDearPage implements OnInit {


  constructor(public router:Router,private popoverController: PopoverController,private languageService: LanguageService) {
    if (!this.languageService.selectedLang) {
      this.languageService.setInitialAppLanguage();
    }
   }

  ngOnInit() {

  }

  goto_signup(){
this.router.navigate(['register-cat'])
  }

  goto_login(){

    this.router.navigate(['sign-in']);
  }

  async openLanguagePopOver($event) {
    const popover = await this.popoverController.create({
      component: LanguagePopoverPage,
      event: $event
    });
    await popover.present();
  }

}

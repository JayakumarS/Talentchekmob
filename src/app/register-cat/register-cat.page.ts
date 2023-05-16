import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { LanguagePopoverPage } from '../language-popover/language-popover.page';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-register-cat',
  templateUrl: './register-cat.page.html',
  styleUrls: ['./register-cat.page.scss'],
})
export class RegisterCatPage implements OnInit {

  constructor(public router:Router,private popoverController: PopoverController,private languageService: LanguageService,) {
    if (!this.languageService.selectedLang) {
      this.languageService.setInitialAppLanguage();
    }
   }

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
  async openLanguagePopOver($event) {
    const popover = await this.popoverController.create({
      component: LanguagePopoverPage,
      event: $event
    });
    await popover.present();
  }

}

import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-language-popover',
  templateUrl: './language-popover.page.html',
  styleUrls: ['./language-popover.page.scss'],
})
export class LanguagePopoverPage implements OnInit {

 //#region Declaration
 languages = [];
 selected = '';
  langSelected: string;
 //#endregion

 //#region Constructor
 constructor(private popoverController: PopoverController,
   private languageService: LanguageService) { }
 //#endregion

 //#region OnInit
 ngOnInit() {
   this.languages = this.languageService.getLanguages();
   this.selected = this.languageService.selected;
   console.log(this.languages),
   console.log(this.selected)
 }
 //#endregion

 //#region Functions
 select(lng) {
   this.languageService.setLanguage(lng);
   this.popoverController.dismiss();
   localStorage.setItem('selLanguage', lng);
   this.langSelected=localStorage.getItem("selLanguage") ;
   console.log(this.langSelected)
 }
 //#endregion
}

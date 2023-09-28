import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-search-popup',
  templateUrl: './search-popup.page.html',
  styleUrls: ['./search-popup.page.scss'],
})
export class SearchPopupPage implements OnInit {

   //#region Declaration
//  searchList = ['Today','This week','This month','This year','All'];
 searchList = ['Today','This week','This month','This year'];
 selected = '';
 //#endregion

 //#region Constructor
 constructor(private popoverController: PopoverController,
   private languageService: LanguageService) { }
 //#endregion

 //#region OnInit
 ngOnInit() {

  this.selected  = localStorage.getItem('filterValue');
  this.languageService.setFilterValues(this.selected);
  
  //  this.languages = this.languageService.getLanguages();
  //  this.selected = this.languageService.selected;
  //  console.log(this.languages),
  //  console.log(this.selected)
 }
 //#endregion

 //#region Functions
 select(search) {
   this.languageService.setFilterValues(search);
   //sessionStorage.setItem("filterValue",search);
   this.popoverController.dismiss();
   localStorage.setItem('filterValue', search);
   //this.langSelected=localStorage.getItem("selLanguage") ;
   //console.log(this.langSelected)
 }
}

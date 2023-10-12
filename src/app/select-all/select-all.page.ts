import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-select-all',
  templateUrl: './select-all.page.html',
  styleUrls: ['./select-all.page.scss'],
})
export class SelectAllPage implements OnInit {

  searchList = ['Select All'];
  selected = '';

  constructor(private popoverController: PopoverController, private languageService: LanguageService) { }

  ngOnInit() {
  this.selected  = localStorage.getItem('selectAll');
  this.languageService.setSelectedValue(this.selected);

   }
   //#endregion
  
   //#region Functions
   select(search) {
    this.languageService.setSelectedValue(search);
     this.popoverController.dismiss();
     localStorage.setItem('selectAll', search);
   }

}

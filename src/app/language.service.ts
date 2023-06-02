import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  //#region Declaration
  selected = '';
  selectedLang = '';
  languages = [];
  //#endregion

  //#region Constructor
  constructor(private translate: TranslateService, private storage: Storage, private storageservice: StorageService) {
    this.getLanguages();
  }
  //#endregion

  //#region Functions
  setInitialAppLanguage() {
    const language = this.translate.getBrowserLang();
    this.translate.setDefaultLang('en');
    this.setLanguage('en');
    this.storage.get('LNG_KEY').then(val => {
      if (val) {
        this.setLanguage(val);
        this.selected = val;
      }
    });
  }

  getLanguages() {
    this.languages = [

      { text: 'English', value: 'en', img: 'assets/img/en.png' },
      { text: 'русский', value: 'ru', img: 'assets/img/ru.png' },
      { text: 'فارسی', value: 'fa', img: 'assets/img/fa.png' },
      { text: 'عربي', value: 'ar', img: 'assets/img/ar.png' },
      { text: 'हिंदी', value: 'hi', img: 'assets/img/hi.png' },
      { text: 'தமிழ்', value: 'tn', img: 'assets/img/tn.png' },
      { text: 'ಕನ್ನಡ', value: 'kn', img: 'assets/img/kn.png' },
      { text: 'తెలుగు', value: 'te', img: 'assets/img/te.png' },
      { text: 'മലയാളം', value: 'ml', img: 'assets/img/ml.png' }      
    ];
    return this.languages
  }

  setLanguage(lng) {
    this.translate.use(lng);
    this.selected = lng;
    this.storage.set('LNG_KEY', lng);
    localStorage.setItem('selectedLang', lng);
    console.log(localStorage.getItem('selectedLang'));
    for (let i = 0; i < this.languages.length; i++) {
      if (this.languages[i].value === this.selected) {
        this.selectedLang = this.languages[i];
        console.log("selectedLang frm service: " + this.selectedLang["value"])
        this.storageservice.publishSomeData({ selectedLang: this.selectedLang["value"] });
        console.log(`Posting Data this.selectedLang: ${JSON.stringify(this.selectedLang)}`);
      }
    }
  }
  //#endregion
}

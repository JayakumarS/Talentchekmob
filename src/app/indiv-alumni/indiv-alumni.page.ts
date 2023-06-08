import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-indiv-alumni',
  templateUrl: './indiv-alumni.page.html',
  styleUrls: ['./indiv-alumni.page.scss'],
})
export class IndivAlumniPage implements OnInit {

  userId: string;
  talentId: string;
  alumniList:any;
  mySlicedArray = [];
  flagChange:boolean=false;
  selectedLang: string;
  constructor(public router:Router,public storageservice: StorageService,public languageService:LanguageService) { }

  ngOnInit() {
    this.getAlumniList();
    this.selectedLang  = localStorage.getItem('selectedLang');
    this.languageService.setLanguage(this.selectedLang);
  }

  

  getAlumniList(){

    let offset = 0;
    this.talentId = localStorage.getItem("userId")  ; 

    var alumniListURL = "api/auth/app/contactGrid/orgAlumniListMob";
    this.storageservice.getrequest(alumniListURL+ "?talentId=" + this.talentId +"&offset=" + offset).subscribe(result => { 
    
    console.log(result);
    if(result['Success'] == true){
    this.alumniList = result['searchList'];
    this.mySlicedArray = this.alumniList;
         console.log(this.mySlicedArray);
        this.flagChange =true;
        this.storageservice.dismissLoading();
    }
    });
  }

  loadMore(event){
    let length2 = 0;
    if(this.mySlicedArray.length != 0){
      let length = this.mySlicedArray.length;
      length2 = length
      console.log(length2)
      this.talentId = localStorage.getItem("userId")  ; 
      var alumniListURL = "api/auth/app/contactGrid/orgAlumniListMob";
      this.storageservice.getrequest(alumniListURL+ "?talentId=" + this.talentId +"&offset=" + length2).subscribe(result => { 
     
        this.alumniList = result['searchList'];
        if(this.alumniList.length>=1){
          this.mySlicedArray=this.mySlicedArray.concat(this.alumniList);
         
         this.flagChange =true;
         this.storageservice.dismissLoading();
         }
         else{
           this.flagChange=false;
           this.storageservice.dismissLoading();
         } 
     }); 
    
      event.target.complete();
    }
  }

  goto_settings(){
    this.router.navigate(['/settings']) 
  }

  studentnetwork(onitalentid,onitype){
    let edit = {

      onitalentId :onitalentid,
      oniType:onitype
    }
  
    let navigationExtras: NavigationExtras = {
      queryParams: edit
    };
    this.router.navigate(['/indiv-alumni-list'], navigationExtras);
  

  }

}

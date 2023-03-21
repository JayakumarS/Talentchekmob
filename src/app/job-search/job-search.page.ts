import { Component, OnInit,ViewChild  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { ProfileViewPopupPage } from '../profile-view-popup/profile-view-popup.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.page.html',
  styleUrls: ['./job-search.page.scss'],
})

export class JobSearchPage implements OnInit {
  @ViewChild('popover') popover;
  
  isOpen:boolean = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  jobSearchHeadForm : FormGroup;
  jobSearchForm : FormGroup;
  uls :any = [];
  basicprofilesearchList =[];
  flagChange:boolean=false;
  flag: boolean =false;
  constructor(private fb: FormBuilder,public storageservice: StorageService, public modalController: ModalController,public router:Router) { }

  ngOnInit() {
    this.jobSearchHeadForm = this.fb.group({
      searchType :["talentid"],
      searchValue :[""]
    })
    this.uls = document.querySelectorAll("ul");

    this.uls.forEach((ul) => {
      const resetClass = ul.parentNode.getAttribute("class");
      const lis = ul.querySelectorAll("li");
      flagChange:false;
      lis.forEach((li) => {
        li.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const target = e.currentTarget;
    
          if (
            target.classList.contains("active") ||
            target.classList.contains("follow")
          ) {
            return;
          }
    
          ul.parentNode.setAttribute(
            "class",
            `${resetClass} ${target.getAttribute("data-where")}-style`
          );
    
          lis.forEach((item) => this.clearClass(item, "active"));
    
          this.setClass(target, "active");
        });
      });
    });

  }
  
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  search(){
   console.log(this.jobSearchHeadForm.value); 

       var BasicSearcUrl = "api/auth/app/profileLookUp/basicProfileSearchList";


    var postData = {
      "searchby":this.jobSearchHeadForm.value.searchType,
      "searchvalue":this.jobSearchHeadForm.value.searchValue,
      "btn":"basicbtn"
    }
     this.storageservice.postrequest(BasicSearcUrl, postData).subscribe(result => {
       this.basicprofilesearchList = result['basicprofilesearchList'];
       if(this.basicprofilesearchList.length>=1){
        this.flagChange =true;
        }
        else{
          this.flagChange=false;
        }
       console.log(result);

    });
   }

   goto_advanceSearch(){

    this.router.navigate(['/search-settings']);
   }
  
  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }
  clearClass(node, className) {
    node.classList.remove(className);
  }
  
  setClass(node, className) {
    node.classList.add(className);
  }

  async profileView(talentId) {

    const modal = await this.modalController.create({
      component: ProfileViewPopupPage,
      cssClass: 'my-custom-class',
      componentProps: {
        "talentId": talentId,
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {

        //#region Getting values from popup
        console.table("One: " + dataReturned);
        //#endregion

      }
    });

    return await modal.present();
  }
 
}

import { Component, OnInit,ViewChild  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { ProfileViewPopupPage } from '../profile-view-popup/profile-view-popup.page';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { NavigationEnd } from '@angular/router';
import { ScrollDetail } from '@ionic/core';


@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.page.html',
  styleUrls: ['./job-search.page.scss'],
})

export class JobSearchPage implements OnInit {
  mySlicedArray = [];
  mySlicedArray2 = [];
  btn: any;
  advanceFlag: boolean = false;

  doRefresh(event) {
    this.ngOnInit();
     setTimeout(() => {
     event.target.complete();
    }, 2000);
 }
  @ViewChild('popover') popover;
  
  isOpen:boolean = false;
  formValues: any; 
  roleId: any;
  RoleID: any;
  currentUserId:any;
  currentUserName:any;
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
  creditPoints: any;



  
  
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,public storageservice: StorageService,private toastController: ToastController, public modalController: ModalController,
    public router:Router,private loadingCtrl: LoadingController,public alertController: AlertController) {

   this.creditPoints = localStorage.getItem("creditPoints") ;
   this.roleId = localStorage.getItem("roleId");
   this.currentUserId = localStorage.getItem("userId");
   this.currentUserName = localStorage.getItem("userName");


   this.route.queryParams.subscribe(params => {
       if (Object.keys(params).length != 0) { 
        this.formValues = params;
        this.btn = "advancebtn";
        this.advanceFlag= true;
      this.storageservice.showLoading(); 
        var BasicSearcUrl = "api/auth/app/profileLookUp/basicProfileSearchList"; 
        this.storageservice.postrequest(BasicSearcUrl, this.formValues).subscribe(result => {
          this.basicprofilesearchList = result['basicprofilesearchList'];
          if(this.basicprofilesearchList.length>=1){ 
            this.basicprofilesearchList.forEach(element=>{
              if(element.profilepic== null || element.profilepic==""){
               element.profilepic = "https://ionicframework.com/docs/img/demos/avatar.svg";
              } 
             });

             this.mySlicedArray = this.basicprofilesearchList;
             console.log(this.mySlicedArray);
           this.flagChange =true;
           this.storageservice.dismissLoading(); 
           }
           else{
             this.flagChange=false;
             this.storageservice.dismissLoading(); 
           }
          console.log(result); 
       });
      }else{
        this.advanceFlag = false;
        this.btn = "basicbtn";
      }
  }); 


     }



  ngOnInit() {
    this.mySlicedArray = [];
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/job-search') {
        this.setSelectedTab('search');
      }
    });
 
    this.roleId = localStorage.getItem("roleId");
    this.RoleID =  this.roleId.split(",", 3);

    
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


  onScroll(event: CustomEvent<ScrollDetail>) {
    console.log('Scroll event detected' + event.detail.scrollTop);
    // Call your function here
  }


   
  // onScroll(event: Event) {
  //   console.log('Scroll event detected' + event.target);
  //   // Call your function here
  // }
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  async search(){
    this.btn = "basicbtn";
    this.advanceFlag = false;
    if(this.jobSearchHeadForm.value.searchValue == "" || this.jobSearchHeadForm.value.searchValue == null ){

      const alert = await this.toastController.create({
        header: '',
        message: 'Please Enter the Valid Details',
        cssClass: 'yourClass',
        position: 'middle',
        duration: 3000,

      });
      await alert.present();
    }

    else{

    this.storageservice.showLoading();
   console.log(this.jobSearchHeadForm.value); 

       var BasicSearcUrl = "api/auth/app/profileLookUp/basicProfileSearchList";

      let offset = 0;
    var postData = {
      "searchby":this.jobSearchHeadForm.value.searchType,
      "searchvalue":this.jobSearchHeadForm.value.searchValue,
      "btn":this.btn,
      "offset":offset
    }
      this.storageservice.postrequest(BasicSearcUrl, postData).subscribe(result => {
       this.basicprofilesearchList = result['basicprofilesearchList'];
       if(this.basicprofilesearchList.length>=1){

        this.basicprofilesearchList.forEach(element=>{
         if(element.profilepic== null || element.profilepic==""){
          element.profilepic = "https://ionicframework.com/docs/img/demos/avatar.svg";
         }
          
        });
         this.mySlicedArray = this.basicprofilesearchList;
         console.log(this.mySlicedArray);
        this.flagChange =true;
        this.storageservice.dismissLoading();
        }
        else{
          this.flagChange=false;
          this.storageservice.dismissLoading();
        }
       console.log(result);

    });

  }
   }



   loadMore(event){
    let length2 = 0;
    if(this.mySlicedArray.length != 0){
      let length = this.mySlicedArray.length;
      length2 = length
      console.log(length2)
    var BasicSearcUrl = "api/auth/app/profileLookUp/basicProfileSearchList";

    if(this.advanceFlag == false){
      var postData = {
        "searchby":this.jobSearchHeadForm.value.searchType,
        "searchvalue":this.jobSearchHeadForm.value.searchValue,
        "btn":this.btn,
        "offset":length2
      }

      this.storageservice.postrequest(BasicSearcUrl, postData).subscribe(result => {
        this.basicprofilesearchList = result['basicprofilesearchList'];
        if(this.basicprofilesearchList.length>=1){
          this.mySlicedArray=this.mySlicedArray.concat(this.basicprofilesearchList);
         this.basicprofilesearchList.forEach(element=>{
          if(element.profilepic=="null" || element.profilepic==""){
           element.profilepic = "https://ionicframework.com/docs/img/demos/avatar.svg";
          } 
         });
         this.flagChange =true;
         this.storageservice.dismissLoading();
         }
         else{
           this.flagChange=false;
           this.storageservice.dismissLoading();
         } 
     }); 
    }else{
      this.formValues = { ...this.formValues, offset: length }; 
      this.storageservice.postrequest(BasicSearcUrl, this.formValues).subscribe(result => {
        this.basicprofilesearchList = result['basicprofilesearchList'];
        if(this.basicprofilesearchList.length>=1){ 
          this.mySlicedArray=this.mySlicedArray.concat(this.basicprofilesearchList);
          this.basicprofilesearchList.forEach(element=>{
            if(element.profilepic=="null" || element.profilepic==""){
             element.profilepic = "https://ionicframework.com/docs/img/demos/avatar.svg";
            } 
           });
          this.flagChange =true;
         this.storageservice.dismissLoading(); 
         }
         else{
           this.flagChange=false;
           this.storageservice.dismissLoading(); 
         } 
     });
    } 
      event.target.complete();
    }
  }

   ChangeOptionEvent(event){
    console.log("SelectedValue: " + event.target.value); 
    this.jobSearchHeadForm = this.fb.group({
      searchValue: [""],
      searchType : [event.target.value]
    });
     this.basicprofilesearchList = [];
   }



   goto_advanceSearch(){

    this.basicprofilesearchList = [];
    this.jobSearchHeadForm = this.fb.group({
      searchValue: [""],
      searchType : ["talentid"]
    });

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

  async profileView(talentId,accounttype,username) {


    if(this.creditPoints < 2 ){

      {
        let alert = await this.alertController.create({
          header: 'Credit Points Alert!',
          message: "You're low on credits. Go to Pricing & Credits to recharge.",
          cssClass: 'alertclass',
          buttons: [
            {
              text: '',
              role: 'cancel',
              handler: () => {
               console.log('Confirm Cancel');
              }
            },
            {
              text: 'Recharge Now',
              role: 'btn',
              handler: () => {

                if (this.roleId.includes('1')) {
                  this.router.navigate(['/subscription-individual']);
                } else if (this.roleId.includes('2')) {
                  this.router.navigate(['/subscription-insorg']);
                } else if (this.roleId.includes( '3')) {
                  this.router.navigate(['/subscription-insorg']);
                }
             //   console.log('Confirm Cancel');
              }
            }
          ]
        });
        await alert.present();
      }
    }
    else if(accounttype == "private"){
     this.PrivateUserAccTypeAlert();
    }
    else if (accounttype == "on demand"){
    
    // this.OnDemandUserAccTypeAlert(talentId);
    this.checkOnDemandUserProp(talentId,username);
    }
    else{

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


  checkOnDemandUserProp(action1,username){

    let onDemandUrl =  "api/auth/app/profileLookUp/onDemandRequest?currentUserId="+this.currentUserId+"&approvedId="+action1;

    this.storageservice.getrequest(onDemandUrl).subscribe(async result => {
      
      console.log(result);


      if(result["success"] == true){

        if(result["onDemandStatus"] == "showrequestpopup"){

          this.OnDemandUserAccTypeAlert(action1,username);
        }
        else if(result["onDemandStatus"] == "requested"){

         let message = "Awaiting access permission from user.";
         this.OndemandAccTypeAlert(message);

        }

        else if(result["onDemandStatus"] == "true"){

          const modal = await this.modalController.create({
            component: ProfileViewPopupPage,
            cssClass: 'my-custom-class',
            componentProps: {
              "talentId": action1,
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

        else if(result["onDemandStatus"] == "false"){

          let message = "Access to view profile denied by user."

          this.OndemandAccTypeAlert(message);

        }
      }

   });

  }

  async OndemandAccTypeAlert(Message) {
    let alert = await this.alertController.create({
      header: 'Alert!',
      message: Message,
      cssClass: 'alertclass',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          //cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });
    await alert.present();

  }


  async OnDemandUserAccTypeAlert(talentId,userName) {
    let alert = await this.alertController.create({
      header: 'Alert!',
      message: 'Please send a request to view full profile.',
      cssClass: 'alertclass',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          //cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Send request',
          //cssClass: 'btncss',
          handler: () => {
            console.log('Send request now, Confirm Okay');

            //Main concept.
            console.log("Id: " + talentId);

            var postData = {
              "talentid":talentId,
              "username":userName,
              "currentUserId":this.currentUserId,
              "currentUserName":this.currentUserName
            }


            let onDemandUrl =  "api/auth/app/profileLookUp/saveOnDemand";

             this.storageservice.postrequest(onDemandUrl,postData).subscribe(async result => {
      
             console.log(result);

             if (result['success']== true){

              this.storageservice.generalAlertToast("View Access Requested!");
             }
             else if (result['success']== false){

              this.storageservice.generalAlertToast("Access Request Failed!");
             }
             });

          }
        }
      ]
    });

    await alert.present();
  }



  async PrivateUserAccTypeAlert() {
    let alert = await this.alertController.create({
      header: 'Alert!',
      message: 'This is a private profile, No access to view full details.',
      cssClass: 'alertclass',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          //cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });

    await alert.present();
  }




  // footer nav

  goto_profileSearch(){
    this.router.navigate(['/job-search']);
  }
  goto_jobs(){
    this.router.navigate(['/job']);
  }
  goto_orgjobs(){

    this.router.navigate(['/oni-job-post-list']);
  }
  goto_instijobs(){
    this.router.navigate(['/oni-job-post-list']);

  }
  goto_orghome(){

    this.router.navigate(['/organization-dashboard']);
  }
  goto_instihome(){
    this.router.navigate(['/institution-dashboard']);
  
  }
  goto_home(){
    this.router.navigate(['/home']);
  }
  goto_instiprofile(){

    this.router.navigate(['/insti-profile-view']);
  }
  goto_orgprofile(){
  
    this.router.navigate(['/org-profile-view']);
  }
  goto_profile(){
    this.router.navigate(['/profile-view']);
  }
  goto_more(){
    this.router.navigate(['/settings']);
  }


  showLoadingIndicator() {
    this.loadingCtrl.create({
      message: 'Processing...',
      spinner: 'bubbles',
      cssClass: 'loadingIndicatorCustom'
    }).then((loading) => {
      loading.present();
    });
  }
  hideLoadingIndicator() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    });
  }
 
}
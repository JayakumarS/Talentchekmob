import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ProfileViewPopupPage } from '../profile-view-popup/profile-view-popup.page';

@Component({
  selector: 'app-indiv-alumni-list',
  templateUrl: './indiv-alumni-list.page.html',
  styleUrls: ['./indiv-alumni-list.page.scss'],
})
export class IndivAlumniListPage implements OnInit {

  onitalentId:string;
  studentNetwork : FormGroup;
  corporateNetwork : FormGroup;
  commonList:[];
  creditPoints:any;
  roleId:any;
  currentUserId:any;
  currentUserName:any;
  title:string;

  constructor(private route: ActivatedRoute,private fb: FormBuilder,public storageservice: StorageService,
    public alertController: AlertController,public modalController: ModalController,public router:Router) {

    this.studentNetwork = this.fb.group({
      degree: [""],
      fos: [""],
      locationValue : [""],
      graduationYear: [""],
      talentId:[""]
    });


    this.corporateNetwork = this.fb.group({
      designation: [""],
      department: [""],
      locationValue : [""],
      graduationYear: [""],
      talentId:[""]
    });


    this.route.queryParams.subscribe(params => {
      if (params) {
  
        if (params != null) {

          console.log(params);

          if(params['oniType'] == 'exp'){

            this.title = 'Corporate Alumni';

            this.getCorporate(params.onitalentId);
          }
          else if(params['oniType'] == 'edu'){

            this.title = 'Student Alumni';

            this.getStudentNetwork(params.onitalentId);
          }
          
        }
      }
    });
   }

  ngOnInit() {
  }

  getCorporate(onitalentId){
    this.storageservice.showLoading();
    this.corporateNetwork.patchValue({
      'talentId' : onitalentId,

    })

    var corporateAlumniListURL = "api/auth/app/Network/getCorporateNetworkList";
    this.storageservice.get(corporateAlumniListURL,this.corporateNetwork.value).subscribe(data => {
    console.log(data);
     if(data['success'] == true){
      this.commonList = data['corporateNetworkList'];
      this.storageservice.dismissLoading();
     }
    });
  }

  

  getStudentNetwork(onitalentId){
    this.storageservice.showLoading();
    this.studentNetwork.patchValue({
      'talentId' : onitalentId,

    });

    var studentAlumniListURL = "api/auth/app/Network/getStudentNetworkList";
    this.storageservice.get(studentAlumniListURL,this.studentNetwork.value).subscribe(data => {
    console.log(data);
     if(data['success'] == true){
      this.commonList = data['studentNetworkList'];
      this.storageservice.dismissLoading();
     }
    });

  }


  async profileView(talentId,accounttype,username) {


    if(this.creditPoints < 2){
  
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

  goto_orgHome(){

    this.router.navigate(['/indiv-alumni']);

}

}

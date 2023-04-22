import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ProfileViewPopupPage } from '../profile-view-popup/profile-view-popup.page';

@Component({
  selector: 'app-oni-alumni-list',
  templateUrl: './oni-alumni-list.page.html',
  styleUrls: ['./oni-alumni-list.page.scss'],
})
export class OniAlumniListPage implements OnInit {

  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
     event.target.complete();
    }, 2000);
 }
  studentNetwork : FormGroup;
  commonList:[];
  studentNetworkCount:any;
  corporateNetworkCount:any;
  creditPoints:any;
  roleId:any;
  currentUserId:any;
  currentUserName:any;
  title:string;

  constructor(private route: ActivatedRoute, private storageservice: StorageService,private fb: FormBuilder, public modalController: ModalController,
    public router:Router,private loadingCtrl: LoadingController,public alertController: AlertController) {


    this.creditPoints = localStorage.getItem("creditPoints") ;
    this.roleId = localStorage.getItem("roleId");
    this.currentUserId = localStorage.getItem("userId");
    this.currentUserName = localStorage.getItem("userName");

    this.studentNetwork = this.fb.group({
      degree: [""],
      fos: [""],
      locationValue : [""],
      graduationYear: [""],
      talentId:[""],
      eduid:[""],
      highlightType:[""],
      highlightFlag:[""],
      designation: [""],
      department: [""]
    });

    
   }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params) {
  
        if (params != null) {

          console.log(params);

          if(params['title'] == 'Student'){
            this.title = 'Alumni Student';
            this.get_StudentNetwork();
          }
          else if (params['title'] == 'Corporate'){
            this.title = 'Corporate Alumni';
            this.get_CorporateNetwork();
          }
          
        }
      }
    });

   }

  get_StudentNetwork(){
    this.studentNetwork.value['talentId'] =this.currentUserId;
this.storageservice.showLoading();
    var indiRatingsCountURL = "api/auth/app/Network/getStudentNetworkList";
  this.storageservice.get(indiRatingsCountURL,this.studentNetwork.value).subscribe(result => {

if(result['success'] == true) {
  console.log(result);
  this.storageservice.dismissLoading();
  this.studentNetworkCount = result['studentNetworkList'].lenght;
  this.commonList = result['studentNetworkList'];
}else{
  this.storageservice.dismissLoading();
}   
});
}

get_CorporateNetwork(){
  this.studentNetwork.value['talentId'] =this.currentUserId;
  this.storageservice.showLoading();
  var corporateNetworkURL = "api/auth/app/Network/getCorporateNetworkList";

  this.storageservice.get(corporateNetworkURL,this.studentNetwork.value).subscribe(res => {
  
    console.log(res);
    if(res['success'] == true){
      this.storageservice.dismissLoading();
      this.corporateNetworkCount = res['corporateNetworkList'].length;
      this.commonList = res['corporateNetworkList'];
    }
    this.storageservice.dismissLoading();
  
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

    this.router.navigate(['/oni-alumni']);

}


}

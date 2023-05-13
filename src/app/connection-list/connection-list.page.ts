import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ProfileViewPopupPage } from '../profile-view-popup/profile-view-popup.page';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-connection-list',
  templateUrl: './connection-list.page.html',
  styleUrls: ['./connection-list.page.scss'],
})
export class ConnectionListPage implements OnInit {
  roleId: any;
  RoleID: any;
  userId: string;
  connectionList: any;
  @ViewChild('popover') popover;
  
  isOpen:boolean = false;
  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  constructor(public router:Router,public modalController: ModalController,public storageservice: StorageService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = localStorage.getItem("userId")  ;
    this.route.queryParams.subscribe(params => {
      if (params) { 
        if (params != null || params != undefined ) {
          const relationship = params.p.slice(0, -3)   
            this.getconnection(this.userId,relationship); 
          console.log(relationship);
        }
      }
    });
    
    this.userId = localStorage.getItem("userId")  ; 
    this.roleId = localStorage.getItem("roleId");
    this.RoleID =  this.roleId.split(",", 3);
    // this.getconnection();
  }
  goto_profileView(){
    this.router.navigate(['/profile-view']);
  }
  newOrgprofileView() {
    this.router.navigate(['/org-profile-view']);
  }
  newInstiprofileView() {
    this.router.navigate(['/insti-profile-view']);
  }

  getconnection(userid,relationship){

    var connectionListsURL = "api/auth/app/mobile/ConnectionList";

    this.storageservice.showLoading();
    
     

  this.storageservice.getrequest(connectionListsURL +"?currentUserId=" + userid +"&relationship=" + relationship).subscribe(result => {
    
     // this.jobPostList = result['JobAdvertisementList'];

     if(result['success']== true){
      this.storageservice.dismissLoading()
       this.connectionList = result['connectionlist']; 
      // this.matchedCount = result['matchedList'].length ;
      // this.orgBidCount = result['orgBidList'].length ;

      // this.applicationsReceivedList = result['applicationsReceivedList'];
      // this.matchedList = result['matchedList'];
      // this.orgBidList = result['orgBidList'];
     }
      console.log(this.connectionList);
    });
  }

  async profileView(talentId){
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

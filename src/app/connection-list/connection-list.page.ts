import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

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

  constructor(public router:Router,public storageservice: StorageService) { }

  ngOnInit() {
    
    this.userId = localStorage.getItem("userId")  ; 
    this.roleId = localStorage.getItem("roleId");
    this.RoleID =  this.roleId.split(",", 3);
    this.getconnection();
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

  getconnection(){

    var connectionListsURL = "api/auth/app/mobile/ConnectionList?currentUserId="+this.userId;


  this.storageservice.getrequest(connectionListsURL).subscribe(result => {

     // this.jobPostList = result['JobAdvertisementList'];

     if(result['success']== true){

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


}

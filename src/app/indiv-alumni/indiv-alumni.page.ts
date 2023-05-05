import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-indiv-alumni',
  templateUrl: './indiv-alumni.page.html',
  styleUrls: ['./indiv-alumni.page.scss'],
})
export class IndivAlumniPage implements OnInit {

  userId: string;
  alumniList:any;
  constructor(public router:Router,public storageservice: StorageService) { }

  ngOnInit() {
    this.getAlumniList();
  }

  

  getAlumniList(){

    this.userId = localStorage.getItem("userId")  ; 

    var alumniListURL = "api/auth/app/contactGrid/orgAlumniList?talentId="+this.userId;
    this.storageservice.getrequest(alumniListURL).subscribe(data => {
    console.log(data);
    if(data['Success'] == true){
this.alumniList = data['searchList'];
    }
    });
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

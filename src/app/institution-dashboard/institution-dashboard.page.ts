import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-institution-dashboard',
  templateUrl: './institution-dashboard.page.html',
  styleUrls: ['./institution-dashboard.page.scss'],
})
export class InstitutionDashboardPage implements OnInit {

  userId: string;
  creditPoints: any;
  profileViewCount:any;
  oniRating:any;
  instCountlist:[];
  constructor(public router:Router,public storageservice: StorageService) { }

  ngOnInit() {

    
    this.userId = localStorage.getItem("userId")  ; 
   this.creditPoints = localStorage.getItem("creditPoints") ;

   var indiProfileViewCountURL = "api/auth/app/dashboard/profileviewcount?currentUserId="+this.userId;
   this.storageservice.getrequest(indiProfileViewCountURL).subscribe(result => {
    console.log(result); 
    this.profileViewCount = result['profileviewcount']
       });

       var indiProfileViewCountURL = "api/auth/app/dashboard/avgratingForOni?currentUserId="+this.userId;
   this.storageservice.getrequest(indiProfileViewCountURL).subscribe(result => {
    console.log(result); 
    this.oniRating = result['avgrating'];
       });



       var institutionCountUrl = "api/auth/app/dashboard/instCountlist?currentUserId="+this.userId;
       this.storageservice.getrequest(institutionCountUrl).subscribe(result => {
        console.log(result); 
        this.instCountlist = result['instCountlist'];
           });
  
  }


  selectedTab: string = 'apps';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }
  goto_subscribe(){

    this.router.navigate(['/subscription-insorg']) 
  }

  viewList(btnType,title){
    let edit = {

      btntype :btnType,
      title :title
    }

    let navigationExtras: NavigationExtras = {
      queryParams: edit
    };
    this.router.navigate(['/institution-dashboard-list'], navigationExtras);
  }


// footer
goto_profileSearch(){
  this.router.navigate(['/job-search']);
}
goto_jobs(){
  this.router.navigate(['/oni-job-post']);
}
goto_home(){
  this.router.navigate(['/institution-dashboard']);
}
goto_profile(){
  this.router.navigate(['/insti-profile-view']);
}
goto_more(){
  this.router.navigate(['/settings']);
} 

}

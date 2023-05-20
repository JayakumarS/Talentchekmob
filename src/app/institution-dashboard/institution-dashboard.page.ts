import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-institution-dashboard',
  templateUrl: './institution-dashboard.page.html',
  styleUrls: ['./institution-dashboard.page.scss'],
})
export class InstitutionDashboardPage implements OnInit {

  doRefresh(event) {
    this.ngOnInit(); 
     event.target.complete(); 
 }

  userId: string;
  creditPoints: any;
  profileViewCount:any;
  oniRating:any;
  instCountlist:[];
  constructor(public router:Router,public storageservice: StorageService,private translate: TranslateService,) { }

  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/institution-dashboard') {
        this.setSelectedTab('apps');
        this.getCreditpoints();
      }
    });

    
    this.userId = localStorage.getItem("userId")  ; 
    this.getCreditpoints();
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


  getCreditpoints(){

    
    var creditpointsURL = "api/auth/app/fileUpload/getImgfile?talentId="+this.userId;
    this.storageservice.getrequest(creditpointsURL).subscribe(data => {
    console.log(data);
    if(data['success'] == true){

      localStorage.setItem('creditPoints', data["creditpoints"]);;
      localStorage.setItem('profilePic', data["imageUrl"]);
      localStorage.setItem('categoryType', data["categoryType"]);

      this.creditPoints = localStorage.getItem("creditPoints") ;
    }
    });
  }


  viewmatchesList(){

    this.router.navigate(['/oni-job-post-list']);
  }


// footer
goto_profileSearch(){
  this.router.navigate(['/job-search']);
}
goto_jobs(){
  this.router.navigate(['/oni-job-post-list']);
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

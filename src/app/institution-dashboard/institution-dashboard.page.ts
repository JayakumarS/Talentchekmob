import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../language.service';
import Driver from 'driver.js';

@Component({
  selector: 'app-institution-dashboard',
  templateUrl: './institution-dashboard.page.html',
  styleUrls: ['./institution-dashboard.page.scss'],
})
export class InstitutionDashboardPage implements OnInit {
  selectedLang: string;

  driver:any = new Driver();

  doRefresh(event) {
    this.ngOnInit(); 
     event.target.complete(); 
 }

  userId: string;
  creditPoints: any;
  profileViewCount:any;
  oniRating:any;
  instCountlist:[];
  constructor(private languageService: LanguageService,public router:Router,public storageservice: StorageService,private translate: TranslateService,) { }

  ngOnInit() {

    // this.selectedLang  = localStorage.getItem('selectedLang');
    // this.languageService.setLanguage(this.selectedLang);
    this.selectedLang  = localStorage.getItem('selectedLang');
    if(this.selectedLang=="null")
    {
      this.languageService.setLanguage('ur');
    }
    else{
      this.languageService.setLanguage(this.selectedLang);
    }
    // this.translate.setDefaultLang('en');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/institution-dashboard') {
        this.setSelectedTab('apps');
        this.getCreditpoints();
        this.getTour();
      }
    });

    
    this.userId = localStorage.getItem("userId")  ; 
    this.getCreditpoints();
    this.getTour();
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
  redirectToSection() {
    this.router.navigate(['/insti-profile-view','section']);
  }

  getTour(){

    var getCurrencyURL = "api/auth/app/mobile/getfirstTimeLoginUser?currentUserId=" + this.userId;
    this.storageservice.getrequest(getCurrencyURL).subscribe(result => {
    console.log(result);
    if(result[0].fistTimeloginValue == true){
      this.startTour();
    }
     });

  }

  startTour(){

    this.driver = new Driver({
      stageBackground: "rgba(255, 255, 255, 0.1)", // Background color for the staged behind highlighted element
    });

    this.driver.defineSteps([
      {
        element: '#step1',
        popover: {
         className: 'first-step-popover-class',
          title: 'Profile Lookup',
          description: 'You can search and view profiles here.',
          position: 'top',
        },
      },
      {
        element: '#step2',
        popover: {
          title: 'Hiring',
          description: 'Add your job vacancies here to get matched with job seeker profiles.',
          position: 'top',
        },
      },

      {
        element: '#step3',
        popover: {
          title: 'Profile',
          description: 'Tailor your profile here to impress candidates and  clients with your brand.',
          position: 'top-center',
        },
      },
      {
        element: '#step4',
        popover: {
          title: 'More',
          description: 'Discover Alumni profiles, manage subscriptions and other settings over here.',
          position: 'left-bottom',
        },
      }
      // Add more steps as needed
    ]);
  
    this.driver.start();

    this.getTourFlagUpdate();
  }


  getTourFlagUpdate(){
    var data = {
      "currentUserId":this.userId,
      "fistTimeloginValue":false

     }  
    var updateTourFlag = "api/auth/app/mobile/updateFirstTimeLoginMoblie"; 
    this.storageservice.postrequest(updateTourFlag, data).subscribe(result => {  
       console.log("Image upload response: " + result)
      if (result["success"] == true) {
      // this.presentToast()
       }
    });
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

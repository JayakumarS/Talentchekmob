import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { ProfileViewPopupPage } from '../profile-view-popup/profile-view-popup.page';

@Component({
  selector: 'app-organization-dashboard-list',
  templateUrl: './organization-dashboard-list.page.html',
  styleUrls: ['./organization-dashboard-list.page.scss'],
})
export class OrganizationDashboardListPage implements OnInit {

  public title : string ;
  userId: string;
  creditPoints: any;
  oniList:[];
  applicantsList:[];

  constructor(public router:Router,private route: ActivatedRoute,public modalController: ModalController,public storageservice: StorageService) {

        
    this.userId = localStorage.getItem("userId")  ; 
    this.creditPoints = localStorage.getItem("creditPoints") ;


    this.route.queryParams.subscribe(params => {
      if (params) {
  
        if (params != null) {

          console.log(params);
          this.title = params.title;

          if(params.btntype == "applicants")
          {
            console.log(params)
            this.getAllApplicantList();
          }
          else{            
            this.getAllList(params.btntype);
          }

          
        }
      }
    });
   }

  ngOnInit() {


  }

  getAllList(btntype){

    var oniDashboardListURL = "api/auth/app/dashboard/oniDashboardList?currentUserId="+this.userId+"&selectedType="+btntype;
    this.storageservice.getrequest(oniDashboardListURL).subscribe(result => {

     // this.oniList = result['oniDashboardList'];
           console.log(result); 
        });


  }

 


  getAllApplicantList(){

    //api/auth/app/dashboard/jobsDashboardList

    var oniDashboardListURL = "api/auth/app/dashboard/jobsDashboardList?currentUserId="+this.userId;
    this.storageservice.getrequest(oniDashboardListURL).subscribe(result => {

      this.applicantsList = result['jobsDashboardList'];
           console.log(result); 
        });
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

  goto_orgHome(){

    this.router.navigate(['/organization-dashboard']);
  }




}

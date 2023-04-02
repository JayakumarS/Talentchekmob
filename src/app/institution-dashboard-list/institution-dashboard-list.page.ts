import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-institution-dashboard-list',
  templateUrl: './institution-dashboard-list.page.html',
  styleUrls: ['./institution-dashboard-list.page.scss'],
})
export class InstitutionDashboardListPage implements OnInit {

  public title : string ;
  userId: string;
  creditPoints: any;
  referralsList:[];

  constructor(public router:Router,private route: ActivatedRoute,public modalController: ModalController,public storageservice: StorageService) { 

            
    this.userId = localStorage.getItem("userId")  ; 
    this.creditPoints = localStorage.getItem("creditPoints") ;

    this.route.queryParams.subscribe(params => {
      if (params) {
  
        if (params != null) {

          console.log(params);
          this.title = params.title;

          if(params.btntype == "referrals")
          {
            console.log(params)
            this.getAllReferralsList();
          }
          else{

            
          //  this.getAllList(params.btntype);
          }

          
        }
      }
    });
  }

  


  ngOnInit() {
  }

  getAllReferralsList(){

    var oniDashboardListURL = "api/auth/app/dashboard/oniDashboardList?currentUserId="+this.userId;
    this.storageservice.getrequest(oniDashboardListURL).subscribe(result => {

      this.referralsList = result['referralsDashboardList'];
           console.log(result); 
        });


  }

}

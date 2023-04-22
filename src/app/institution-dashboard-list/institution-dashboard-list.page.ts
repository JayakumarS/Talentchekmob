import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { ProfileViewPopupPage } from '../profile-view-popup/profile-view-popup.page';

@Component({
  selector: 'app-institution-dashboard-list',
  templateUrl: './institution-dashboard-list.page.html',
  styleUrls: ['./institution-dashboard-list.page.scss'],
})
export class InstitutionDashboardListPage implements OnInit {
  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
     event.target.complete();
    }, 2000);
 }

  public title : string ;
  userId: string;
  creditPoints: any;
  referralsList:[];
  oniList:[];
  oniListCount:any;

  constructor(public router:Router,private route: ActivatedRoute,public modalController: ModalController,public storageservice: StorageService) { 

            
    this.userId = localStorage.getItem("userId")  ; 
    this.creditPoints = localStorage.getItem("creditPoints") ;

    
  }

  


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
  
        if (params != null) {

          console.log(params);
          this.title = params.title;

            console.log(params)
            this.getAllList(params.btntype);
          
        }
      }
    });
  }




  getAllList(btntype): void {
 
    var oniDashboardListURL = "api/auth/app/dashboard/oniDashboardList?currentUserId="+this.userId+"&selectedType="+btntype;
    this.storageservice.getrequest(oniDashboardListURL).subscribe(result => {

      this.oniList = result['oniDashboardList'];
      this.oniListCount = result['oniDashboardList'].length;
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

  goto_insHome(){

    this.router.navigate(['/institution-dashboard']);
  }

}

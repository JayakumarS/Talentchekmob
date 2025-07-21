import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

  addPersonalInfo : FormGroup;
  country: string = "";

  userId: string;
  userName: string;
  creditPoints: any;
  roleId: string;
  ticketdetails: any;
  getModuleList: any;
 


  constructor(public formbuilder: FormBuilder,public storageservice: StorageService, private toastController: ToastController,) {


    
    this.userId = localStorage.getItem("userId");
    this.userName = localStorage.getItem("userName");
    this.creditPoints = localStorage.getItem("creditPoints");
    this.roleId = localStorage.getItem("roleId");
    
    this.addPersonalInfo = formbuilder.group({

    
      category: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      module: ['', Validators.compose([Validators.maxLength(20),Validators.required])],
      subject : ['', Validators.required],
      description :['', Validators.required],
      file:[""],
    });
   }

  async ngOnInit() {

 
this.ModuleList();
  }

  selectedTab: string = 'menu';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }


  ModuleList () {
    var InURL = "api/auth/app/Support/getModuleList"+"?roleId=" + 1;
    this.storageservice.getrequest(InURL).subscribe(result => {
      if (result["success"] == true) {
        this.getModuleList = result["getModuleList"];
      }
    });
  }
  IsCountry_SLShow: boolean = false;
  public CountryList: any;
  public CountryListBackup: any;


  

 
  unCheckFocus_Country() {
    console.log("unCheckFocus_Country: ")
    //this.IsCountry_SLShow = false;
  }


  onClickCountry(event) {
    console.log('onClickName event caught');

    this.IsCountry_SLShow = false;
 
  }

 
  save(){

    this.ticketdetails = this.addPersonalInfo.value;
    console.log(` data: ${JSON.stringify(this.ticketdetails)}`);
    var saveticket = "api/auth/app/Support/saveTicketDetails";
  
     this.storageservice.postrequest(saveticket, this.ticketdetails).subscribe(result => {  
        console.log("Image upload response: " + result)
       if (result["success"] == true) {
       // this.router.navigate(['/job']);
        this.presentToast()
        }
     });

  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Saved Successfully',
      duration: 3000,
      cssClass: 'custom-toast'
    });

  await toast.present();
}
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import{ EditCustomerModalPage } from '../modals/edit-customer-modal/edit-customer-modal.page'


@Component({
  selector: 'app-call-entry-customer-search',
  templateUrl: './call-entry-customer-search.page.html',
  styleUrls: ['./call-entry-customer-search.page.scss'],
})
export class CallEntryCustomerSearchPage implements OnInit {

  title = 'app';

  dataReturned: any;

  exampleForm = new FormGroup ({ firstName: new FormControl(), lastName: new FormControl()});


  createForm() {
    this.exampleForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      custName:''
    });
}
  IsSearchListShow: boolean = false;
  isShow = false;
  public ConsList: any;
  public ConsListBackup: any;
  public CustomerDetails : any;
  institutionVal: string;
  customerCode :any;
  organizationNameVal :string; 
  
  constructor(public router: Router,public storageservice: StorageService,private formBuilder: FormBuilder, public modalController: ModalController) {

    this.createForm();
   }

  async ngOnInit() {

    var listConstant = await this.initializeItems();
    
  }


  //#region Search functions
  async initializeItems(): Promise<any> {
    var InsURL = "/api/mobileApp/getmobCustomer";

    const ConsList = this.storageservice.getrequest(InsURL).subscribe(result => {
      this.ConsListBackup = result["lCustomerList"];
      this.ConsList = result["lCustomerList"];
      console.log(`ConsListResponse: ${JSON.stringify(this.ConsList)}`);

    });

    return ConsList;
  }

  unCheckFocus() {
    // this.ionSearchListShow = false;
  }

  go_to_callEntrypage(){
    this.router.navigate(['/call-entry'])
  }

  goToSearchSelectedItem(ConsName,cousId) {
    console.log("ConsName: " + ConsName)

    this.institutionVal = ConsName;
    this.IsSearchListShow = false;
    this.customerCode = cousId ;
    this.getCustomerDtl(cousId);
    this.isShow = true;

  }

  getCustomerDtl(customerCode) {

    var InsURL = "/api/mobileApp/getcallEntryCustomerDetails?customerCode="+customerCode;

    const CustDtls = this.storageservice.getrequest(InsURL).subscribe(result => {
      this.CustomerDetails = result["customerListLimit"];
      console.log(`ConsListResponse: ${JSON.stringify(this.ConsList)}`);

    });

  }

  async filterList(evt) {
    if (evt.srcElement.value != null && evt.srcElement.value != '') {
      this.IsSearchListShow = true;
      this.ConsList = this.ConsListBackup;
      const searchTerm = evt.srcElement.value;
      if (!searchTerm) {
        return;
      }

      var countVal = 0;
      this.ConsList = this.ConsList.filter(currentFood => {
        countVal++;
        if (currentFood.text && searchTerm && countVal < 100) {
          return (currentFood.text.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });

      if (this.ConsList == 0) {
        this.IsSearchListShow = false;
      }
      else {
        this.IsSearchListShow = true;
      }
    }
    else {
      this.IsSearchListShow = false;
    }
  }

  goto_Dashboard() {
    this.router.navigate(['/dashboard-individual'])
  }



  //customer modal view 

  async openModal(cousId) {
    const modal = await this.modalController.create({
      component: EditCustomerModalPage,
      componentProps: { cousId},
      cssClass : 'edit-customer-modal'

    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }
}

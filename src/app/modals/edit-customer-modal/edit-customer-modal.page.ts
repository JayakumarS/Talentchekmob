import { Component, OnInit } from '@angular/core';
import {  ModalController,  NavParams  } from '@ionic/angular';
import { StorageService } from 'src/app/storage.service';




@Component({
  selector: 'app-edit-customer-modal',
  templateUrl: './edit-customer-modal.page.html',
  styleUrls: ['./edit-customer-modal.page.scss'],
})
export class EditCustomerModalPage implements OnInit {

  public ConsList: any;
  public ConsListBackup: any;
  modalTitle: string;
  modelId: number;
  assignBy : string ;
  customer : string;

  public customerDtls :any;


  constructor(
    private modalController: ModalController,
    private navParams: NavParams,public storageservice: StorageService,
  ) { }



  async ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.ConsName;
    this.modalTitle = this.navParams.data.cousId;

    var listConstant = await this.initializeItems();
  }


  async initializeItems(): Promise<any> {

    var EditCusDtlsURL = "/api/mobileApp/getcallEntryCustomerDetails?customerCode=" +this.modalTitle;

    const CustDtls = this.storageservice.getrequest(EditCusDtlsURL).subscribe(result => {
      this.customerDtls = result["customerListLimit"][0];
      console.log(`ConsListResponse: ${JSON.stringify(this.customerDtls)}`);

    });


    var InsURL = "/api/mobileApp/getmobCustomer";

    const ConsList = this.storageservice.getrequest(InsURL).subscribe(result => {
      this.ConsListBackup = result["lCustomerList"];
      this.ConsList = result["lCustomerList"];
      console.log(`ConsListResponse: ${JSON.stringify(this.ConsList)}`);

    });

    return ConsList;

    

  }


  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }



}

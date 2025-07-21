import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-folder-password-modal',
  templateUrl: './folder-password-modal.page.html',
  styleUrls: ['./folder-password-modal.page.scss'],
})
export class FolderPasswordModalPage implements OnInit {

  UserId: string;
  EmpId: string;
  VerifierNameVal: string;
  DesignationVal: string;
  
  talentform: FormGroup;
  isSubmitted: boolean = false;
  passwordIcon: string = 'eye-off';
  passwordType: string = 'password';

  countryResponse:any;

  constructor(public modalController: ModalController, public storageservice: StorageService,  
    private navParams: NavParams, public formbuilder: FormBuilder) { 
      this.talentform = formbuilder.group({
        folderName: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.maxLength(12), Validators.minLength(6), Validators.required])]
  
      });

      this.BindCountry();

    }

  ngOnInit() {

    this.UserId = this.navParams.data.UserId;
    this.EmpId = this.navParams.data.EmpId;
    this.VerifierNameVal = this.navParams.data.UserId;
    this.DesignationVal = this.navParams.data.EmpId;

  }

  BindCountry() {
    var countryURL = "/app/commonUtility/getCountryList";
    var postData = {
      'empid': this.EmpId
    }

    this.storageservice.postrequest(countryURL, postData).subscribe(result => {
      this.countryResponse = result;
      console.log("Country: " + this.countryResponse);
    },
      error => {
        console.log(`Error data: ${JSON.stringify(error)}`);
        if (error.name == "HttpErrorResponse") {
          this.storageservice.warningToast('Internet connection problem, Pls check your internet.');
          this.storageservice.GeneralAlert('HttpErrorResponse', 'Internet connection problem, Pls check your internet.');
        }
        else {
          this.storageservice.warningToast('Error: ' + error.message);
        }
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  async SaveAndCloseModal() {

    this.isSubmitted = true;
    if (!this.talentform.valid) {
      this.storageservice.warningToast('Please provide all the required values!');
    }
    else {
      var folderName = this.talentform.controls['folderName'].value;
      var password = this.talentform.controls['password'].value;

      const onClosedData: any = {
        "folderName": folderName,
        "password": password,
        "Save": "Yes"
      };

      await this.modalController.dismiss(onClosedData);
    }
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

}

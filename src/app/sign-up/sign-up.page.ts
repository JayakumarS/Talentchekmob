import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from '../storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
talentform: FormGroup;
step:any
private stepper: Stepper;
IsSearchListShow: boolean = false;
countryResponseBackup: any;
base64img1: string = '';
countryResponse: any;
countryVal: string;
countryIdVal:string;
fileTransfer: FileTransferObject = this.transfer.create();
splCharRegex: string = "^[^<>{}\"/|;:.,~!?@#$%^=&*\\]\\\\()\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©0-9_+]*$";


  constructor(public formbuilder: FormBuilder,public router: Router,private camera: Camera,
    public storageservice:StorageService, private transfer: FileTransfer,) {

      this.talentform = formbuilder.group({
        firstName: ['', Validators.compose([Validators.maxLength(20), Validators.minLength(3), Validators.pattern(this.splCharRegex), Validators.required])],
        lastName: ['', Validators.compose([Validators.pattern(this.splCharRegex), Validators.required])],
         password: ['', Validators.compose([Validators.maxLength(12), Validators.minLength(8), Validators.required])],
        gender: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
        phoneNo: ['', Validators.compose([Validators.required])],
         panNo: ['', Validators.compose([Validators.maxLength(15), Validators.pattern('^[A-Za-z0-9 ]*$')])],
        email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
        dob: ['', Validators.compose([Validators.maxLength(70), Validators.required])],    //Only for Android  
        address: ['', ''],
        areaName: ['', Validators.compose([Validators.pattern(this.splCharRegex)])],
        country: ['', Validators.compose([Validators.required])],
        stateName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern(this.splCharRegex)])],
        pinCode: ['', Validators.compose([Validators.maxLength(6), Validators.pattern('[0-9]{6}')])],
        referalCode: ['', Validators.compose([Validators.maxLength(20)])],
        accountType: ['', ''],
        cBoxIAgree: ['', ''],
        cBoxIAgreeConsent: ['', '']
  
      });

     }

  next() {
    this.stepper.next();
  }

  onSubmit() {
    console.log(this.talentform.value);
  }

  async ngOnInit() {

    var listConstant = await this.initializeItems(); 

    this.step = 1;
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
  }

  


  goToSearchSelectedItem(CtryName, CtryId) {
    console.log("InsName: " + CtryName)
    console.log("InsId: " + CtryId)

    this.countryVal = CtryName;
    this.countryIdVal = CtryId;
    this.IsSearchListShow = false;
  }


  async initializeItems(): Promise<any> {

    var countryURL = "api/auth/app/CommonUtility/countryList";
    const InsList = this.storageservice.getrequest(countryURL).subscribe(result => {
      this.countryResponseBackup = result["countryList"];
      this.countryResponse = result["countryList"];
      console.log(`countryResponse: ${JSON.stringify(this.countryResponse)}`);
    });

    return InsList;
  }

  unCheckFocus() {
    // this.ionSearchListShow = false;
  }

  async filterList(evt) {
    if (evt.srcElement.value != null && evt.srcElement.value != '') {
      this.IsSearchListShow = true;
      this.countryResponse = this.countryResponseBackup;
      const searchTerm = evt.srcElement.value;
      if (!searchTerm) {
        return;
      }

      var countVal = 0;
      this.countryResponse = this.countryResponse.filter(currentCountry => {
        countVal++;
        if (currentCountry.text && searchTerm && countVal < 100) {
          return (currentCountry.text.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });

      if (this.countryResponse == 0) {
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

  goto_welcome(){

      this.router.navigate(['/hello-dear']) 
  }

  goto_signin(){

    this.router.navigate(['/sign-in']) 
  }


  opengallery() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
  }

  opencamera() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((ImageData => {
      this.base64img1 = "data:image/jpeg;base64," + ImageData;
    }), error => {
      console.log(error);
    })
  }

}

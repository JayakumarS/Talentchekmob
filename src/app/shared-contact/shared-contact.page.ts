import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { LanguageService } from '../language.service';
import { ProfileViewPopupPage } from '../profile-view-popup/profile-view-popup.page';
import { SelectAllPage } from '../select-all/select-all.page';
import * as Papa from 'papaparse';
import { Contacts, Contact, ContactField,ContactName } from '@ionic-native/contacts/ngx';


@Component({
  selector: 'app-shared-contact',
  templateUrl: './shared-contact.page.html',
  styleUrls: ['./shared-contact.page.css'],
})
export class SharedContactPage implements OnInit {
  selectedLang: string;
  sharedContactList: any;
  // sharedContactList = [{ firstname: 'Abraham', mobileno: '1234567890',position:'Developer',checked:false},
  // { firstname: 'Lincoln', mobileno: '8965865865',position:'Developer',checked:false}];

  checkedArray: any =[];
  count: number;

  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
     event.target.complete();
    }, 2000);
 }
  studentNetwork : FormGroup;
  commonList:[];
  studentNetworkCount:any;
  corporateNetworkCount:any;
  creditPoints:any;
  roleId:any;
  currentUserId:any;
  currentUserName:any;
  title:string;
  mySlicedArray = [];
  imagePath:string;

  constructor(private route: ActivatedRoute, private storageservice: StorageService,private fb: FormBuilder, public modalController: ModalController,
    public router:Router,private loadingCtrl: LoadingController,public alertController: AlertController,private languageService: LanguageService,
    private el: ElementRef,private popoverController: PopoverController,private contacts: Contacts) {


    this.creditPoints = localStorage.getItem("creditPoints") ;
    this.roleId = localStorage.getItem("roleId");
    this.currentUserId = localStorage.getItem("userId");
    console.log(this.currentUserId)
    this.currentUserName = localStorage.getItem("userName");
    this.imagePath = this.storageservice.mobileserverurl;

    this.studentNetwork = this.fb.group({
      degree: [""],
      fos: [""],
      locationValue : [""],
      graduationYear: [""],
      talentId:[""],
      eduid:[""],
      highlightType:[""],
      highlightFlag:[""],
      designation: [""],
      department: [""],
      offset:[""],
      selection:[]
    });
   }

  ngOnInit() {


  let onDemandUrl =  "api/auth/app/VisitingCard/ShareContactDetailsList?talentId="+this.currentUserId;

  this.storageservice.getrequest(onDemandUrl).subscribe(async result => {
       console.log(result);
       this.sharedContactList=result;
 });
   }

   async openPopOver($event) {
    const popover = await this.popoverController.create({
      component: SelectAllPage,
      event: $event
    });
    // Listen for the dismissal of the popover
  popover.onDidDismiss().then((data) => {
    // data will contain information about the dismissal, if needed
    // Now you can call selectDate after the popup is closed
    var selected  = localStorage.getItem('selectAll');
    if(selected=='Select All'){
      this.sharedContactList.forEach(element => {
       element.checked=true;
      });
    }
  });
    await popover.present();
  }

goto_Home(){
    this.router.navigate(['/home']);
}

import(){
  this.checkedArray=[];
  this.sharedContactList.forEach(element => {
    if(element.checked){
      element.currentUserId=this.currentUserId;
      this.checkedArray.push(element);
    }
   });
   this.checkedArray;

   var updateContact = "api/auth/app/VisitingCard/updateShareContactDetails";

  this.storageservice.postrequest(updateContact,this.checkedArray).subscribe(async result => {  
    if (result["success"] == true) {
      this.storageservice.dismissLoading();
      }
  });

   const selectedData = this.checkedArray

    // Convert selected data to CSV
    const csvData = Papa.unparse(selectedData);
     this.addContactFromCSV(csvData);

}


saveContact() {
  const contact: Contact = this.contacts.create();

  contact.name = new ContactName(null, 'Abraham', 'Lincoln');
  contact.phoneNumbers = [new ContactField('mobile', '9685117890')];

  contact.save().then(
    () => this.storageservice.successToast('Contact added successfully'),
    (error) => console.error('Error saving contact', error)
  );
}



// Function to add a contact with CSV data
addContactFromCSV(csvData: string) {
  this.count=0;
  const parsedData = Papa.parse(csvData, { header: true });
  const contactsToAdd = parsedData.data;

  contactsToAdd.forEach((contactData) => {
    const contact = this.contacts.create();

    contact.name = new ContactName("Name", contactData.firstname);
    contact.phoneNumbers = [new ContactField('mobile', contactData.mobileno)];
    // contact.id='123';
    // contact.birthday=new Date();
    // contact.addresses=[new ContactField('area', 'chennai')];
    // contact.displayName='New Test';
    // contact.emails=[new ContactField('email', 'abc@mail.com')];
    // contact.organizations=[new ContactField('Org', 'Paragon')];
    // contact.note='New one';
    // contact.nickname='Saro';
    // Set other details as needed

    contact.save().then(
      
      () => this.count++,
      
      (error) => console.error('Error adding contact:', error)
    );
  });
    this.storageservice.successToast('Contact added successfully')
}

import1(){
  //     this.count=0;
  // const parsedData = Papa.parse(csvData, { header: true });
  // const contactsToAdd = parsedData.data;

 // contactsToAdd.forEach((contactData) => {
    const contact = this.contacts.create();

    contact.name = new ContactName("Name", "hghf");
    contact.phoneNumbers = [new ContactField('mobile', "9651515")];
    // contact.id='123';
    // contact.birthday=new Date();
    // contact.addresses=[new ContactField('area', 'chennai')];
    // contact.addresses = [new ContactAddress(true, 'chennai', '', '', '', 'India')];
    // contact.displayName='New Test';
     contact.emails=[new ContactField('email', 'abc@mail.com')];
    // contact.organizations=[new ContactField('Org', 'Paragon')];
    // contact.note='New one';
    // contact.nickname='Saro';
    // Set other details as needed

    contact.save().then(
      
      () => this.count++,
      
      (error) => console.error('Error adding contact:', error)
    );
  //});
    this.storageservice.successToast('Contact added successfully')
    }

}

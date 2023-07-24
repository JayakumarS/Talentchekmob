import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, Platform, AlertController } from '@ionic/angular';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-call-entry',
  templateUrl: './call-entry.page.html',
  styleUrls: ['./call-entry.page.scss'],
})
export class CallEntryPage implements OnInit {

  title = 'app';

  dataReturned: any;

  salesTypeList = ['CROSS TRADE', 'LOCAL', 'NOMINATED'];
  
  callEntryForm = new FormGroup ({ 
    firstName: new FormControl(), 
    lastName: new FormControl(),
    personMet : new FormControl(),
    salesType : new FormControl(),
    address : new FormControl(),
    area: new FormControl(),
    city: new FormControl(),
    termoFsales : new FormControl(),
    natureOfCall : new FormControl(),
    callStatus : new FormControl(),
    transportationMode : new FormControl(),
    serviceType : new FormControl(),
    assignedTo : new FormControl(),
    comments : new FormControl(),
    visitedDate : new FormControl(),
    nextfollowUpdate : new FormControl(),
  });


  createForm() {
    this.callEntryForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      personMet:'',
      salesType:'',
      address:'',
      area :'',
      city:'',
      termoFsales:'',
      natureOfCall:'',
      callStatus:'',
      transportationMode:'',
      serviceType:'',
      assignedTo:'',
      comments:'',
      visitedDate:'',
      nextfollowUpdate:''
    });
}
  
  constructor( 
    public alertController: AlertController,private formBuilder: FormBuilder) {

  }

  //#region OnInit
  ngOnInit() {
  }
  
 

 


}

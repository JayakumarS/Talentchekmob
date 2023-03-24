
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../storage.service';


@Component({
  selector: 'app-educations',
  templateUrl: './educations.page.html',
  styleUrls: ['./educations.page.scss'],
})
export class EducationsPage implements OnInit {
  industryList =[];
  EducationForm : FormGroup;
  IsSearchListShow: boolean = false;
  institutionList: any;
  institutionVal:String;
  IsDegreeListShow: boolean = false;
  degreeList: any;
  degreeListVal: any;
  studyList: any;
  studyListVal: any;
  IsstudyListShow: boolean = false;
  selectedDate: string;
  courseStart: string;
  courseEnd: string;
  userId: any;
  Education: any;
 
  datePicker: any;
  isunregIns:boolean;
  unregisteredIns: string;
  fromdate: any;
  constructor(public router:Router,public storageservice:StorageService,private fb: FormBuilder,
    private toastController: ToastController,) {

    const initialDate = new Date(2023, 2);
    this.courseStart = initialDate.toISOString();
    this.courseEnd = initialDate.toISOString();
   }
   Exp = {
    orgName: '',
  }
  //  setDate() {
  //   let date = new Date(2023, 2, 24); // Year, month (zero-based), day
  //   this.datePicker.setValue(date.toISOString()).then((res) => {
  //     this.myDate = res;
  //   });
  // }
  
  ngOnInit() {
    //this.getstudyList();
    this.EducationForm = this.fb.group({
      institutionName: [""],
      institutionLocation: [""],
      courseStartObj:[""],
      courseEndObj : [""],
      courseStart: [""],
      courseEnd: [""],
      ckeditor:[""],
      currentlyStudy: [""],
      degree: [""],
      fieldofStudy: [""],
      stuRegisterNumber: [""],
      aggregateMarks:[""],
      eduDescription:[""],
      eduId:[""],
      currentUserId:[""]
   });
   this.userId = localStorage.getItem("userId");
    var listConstant =  this.initializeItems(); 
    var listConstant =  this.DegreeListItems(); 
    var listConstant =  this.studyListItems();

    let currentDate = new Date();
    this.selectedDate = currentDate.toISOString();
  }

 
  experience()
  {
    this.router.navigate(['/profile/addExperience']) 
  }

  profile()
  {
    this.router.navigate(['/profile/addProfile']) 
  }
   //institutionList
   unCheckFocus() {
    this.IsSearchListShow = false;
  }
  goToSearchSelectedItem( instName,instId) {
    console.log("InsName: " + instName)
    console.log("InsId: " + instId)
    
    this.institutionVal = instName;
    this.EducationForm.value.permcountry = instId;
    this.IsSearchListShow = false;
    //this.getstatelist(CtryId);
  }
    async initializeItems(): Promise<any> {
  
      var institutionListUrl = "api/auth/app/IndividualProfileDetails/institutionList";
      const InsList = this.storageservice.getrequest(institutionListUrl).subscribe(result => {
        this.institutionList = result["institutionList"];
        this.institutionList = result["institutionList"];
     //   console.log(`countryResponse: ${JSON.stringify(this.countryResponse)}`);
      });
    
      return InsList;
    }
    async filterList(evt) {
      const filterValue = evt.srcElement.value.toLowerCase();
      if(this.isunregIns == false){
        this.unregisteredIns = filterValue ;
        this.EducationForm.patchValue({
          'orgLocation' : '',
        });
        this.EducationForm.get("orgLocation").enable();
      }
      this.isunregIns = false;
      if (evt.srcElement.value != null && evt.srcElement.value != '') {
        this.IsSearchListShow = true;
        this.institutionList = this.institutionList;
        const searchTerm = evt.srcElement.value;
        if (!searchTerm) {
          return;
        }
    
        var countVal = 0;
        this.institutionList = this.institutionList.filter(currentinstitution => {
          countVal++;
          if (currentinstitution.text && searchTerm && countVal < 100) {
            
            return (currentinstitution.text.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
          }
        });
    
        if (this.institutionList == 0) {
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



   

    // DegreeList
   unDegreeList() {
    // this.ionSearchListShow = false;
  }
  goToDegreeListItem( instName,instId) {
    console.log("InsName: " + instName)
    console.log("InsId: " + instId)
    
    this.degreeListVal = instName;
    this.EducationForm.value.degree = instId;
    this.IsDegreeListShow = false;
    //this.getstatelist(CtryId);
  }
    async DegreeListItems(): Promise<any> {
  
      var degreeListUrl = "api/auth/app/IndividualProfileDetails/degreeList";
      const InsList = this.storageservice.getrequest(degreeListUrl).subscribe(result => {
        this.degreeList = result["degreeList"];
        this.degreeList = result["degreeList"];
     //   console.log(`countryResponse: ${JSON.stringify(this.countryResponse)}`);
      });
    
      return InsList;
    }
    async filterdegreeList(evt) {
      if (evt.srcElement.value != null && evt.srcElement.value != '') {
        this.IsDegreeListShow = true;
        this.degreeList = this.degreeList;
        const searchTerm = evt.srcElement.value;
        if (!searchTerm) {
          return;
        }
    
        var countVal = 0;
        this.degreeList = this.degreeList.filter(currentdegreeList => {
          countVal++;
          if (currentdegreeList.text && searchTerm && countVal < 100) {
            return (currentdegreeList.text.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
          }
        });
    
        if (this.degreeList == 0) {
          this.IsDegreeListShow = false;
        }
        else {
          this.IsDegreeListShow = true;
        }
      }
      else {
        this.IsDegreeListShow = false;
      }
    }


    getTitle(bookId) {
      var value;
      this.institutionList.forEach(element => {
        if(element.id===bookId){
          value =  element.text;
          this.unregisteredIns = "" ;
          this.isunregIns = true;
        }
      });
      return value;
    }

    ///studyList
    unstudyList() {
      // this.ionSearchListShow = false;
    }
    goTostudyListItem( instName,instId) {
      console.log("InsName: " + instName)
      console.log("InsId: " + instId)
      
      this. studyListVal = instName;
      this.EducationForm.value.fieldofStudy = instId;
      this.IsstudyListShow = false;
      //this.getstatelist(CtryId);
    }
      async studyListItems(): Promise<any> {
    
        var getstudyListUrl = "api/auth/app/IndividualProfileDetails/studyList";
        const InsList = this.storageservice.getrequest(getstudyListUrl).subscribe(result => {
       
          if (result["success"] == true) {
           this.studyList = result["studyList"]; 
          }
        });
      
        return InsList;
      }
      async filterstudyList(evt) {
        if (evt.srcElement.value != null && evt.srcElement.value != '') {
          this.IsstudyListShow = true;
          this.studyList = this.studyList;
          const searchTerm = evt.srcElement.value;
          if (!searchTerm) {
            return;
          }
      
          var countVal = 0;
          this.studyList = this.studyList.filter(currentstudyList => {
            countVal++;
            if (currentstudyList.text && searchTerm && countVal < 100) {
              return (currentstudyList.text.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
            }
          });
      
          if (this.studyList == 0) {
            this.IsstudyListShow = false;
          }
          else {
            this.IsstudyListShow = true;
          }
        }
        else {
          this.IsstudyListShow = false;
        }
      }

      save(){

//         let date = new Date(this.EducationForm.value.courseStart); // This is your date object
// let formattedDate = this.datePicker.transform(date, 'MM/yyyy');
// console.log(formattedDate); // Output: 24/03/2023
this.EducationForm.value.courseStart =formatDate(this.EducationForm.value.courseStart, 'MM/yyyy','en-IN');
this.EducationForm.value.courseEnd=formatDate(this.EducationForm.value.courseEnd, 'MM/yyyy','en-IN');

console.log(this.fromdate);
this.EducationForm.value;
this.EducationForm.value.unregisteredIns = this.unregisteredIns;
this.EducationForm.value.currentUserId=this.userId;
this.Education = this.EducationForm.value;
console.log(` data: ${JSON.stringify(this.Education)}`);
var saveEducation = "api/auth/app/IndividualProfileDetails/saveEducation";

 this.storageservice.postrequest(saveEducation, this.Education).subscribe(result => {  
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

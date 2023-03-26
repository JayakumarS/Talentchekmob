
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  unregistered: string;
  fromdate: any;

  searchCtrl = new FormControl('');
  searchInstitutionResults: string[] = [];
  searchDegreeResults: string[] = [];
  selecteInstitution: any;
  InstitutionList: any;
  institutionid: string;
  
  searchStudyResults: string[] = [];
  selecteStudy: any;
  selectStudySet: string;
  selectDegreeSet: string;
  constructor(public router:Router,public storageservice:StorageService,private fb: FormBuilder,
    private toastController: ToastController,) {

    const initialDate = new Date(2023, 2);
    this.courseStart = initialDate.toISOString();
    this.courseEnd = initialDate.toISOString();
   }
   Exp = {
    orgName: '',
  }

  
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
   this.getinstitutionList();

     this.getDegreeList(); 
  this.getStudyList();
this.isunregIns=false;
    let currentDate = new Date();
    this.selectedDate = currentDate.toISOString();
  }

 
  experience()
  {
    this.router.navigate(['/profile/addExperience']) 
  }

  profileView()
  {
    this.router.navigate(['/profile-view']) 
  }
  
 
  orgLocation(orgid:any){

    var getlocationUrl = "api/auth/app/IndividualProfileDetails/orgLocation";
    this.storageservice.getrequest(getlocationUrl + "?orgid=" + orgid).subscribe(result => {
      if (result["success"] == true) {
        this.EducationForm.patchValue({
          'institutionLocation' : result["experienceBean"].orgLocation,
        })
        this.EducationForm.get("institutionLocation").disable();
      }
    });
  }
//  institutionList auto complete 
onSearchInstitution(value: string) {

   const filterValue = value.toLowerCase();
      if(this.isunregIns == false){
        this.unregistered = filterValue ;
        this.EducationForm.patchValue({
          'institutionLocation' : '',
        });
        this.EducationForm.get("institutionLocation").enable();
      }
      this.isunregIns = false;
  if (filterValue.length > 0) {
    this.IsSearchListShow = true;
    this.searchInstitutionResults = this.InstitutionList.filter(Institution => Institution.text.toLowerCase().indexOf(value.toLowerCase()) > -1);
  } else {
    this.IsSearchListShow = false;
    this.searchInstitutionResults = [];
  }
}


removeOrganisation(selecteInstitution: string) {
    this.selecteInstitution = undefined;
  }

selectInstitution(institutionName: string,id:string) {
  this.selecteInstitution = institutionName;
  this.IsSearchListShow = false;
  this.institutionid = id;
  this.Exp.orgName = id;
  this.searchInstitutionResults = [];
  this.searchCtrl.setValue('');
}
getinstitutionList(){
  var institutionListUrl = "api/auth/app/IndividualProfileDetails/institutionList";
  this.storageservice.getrequest(institutionListUrl).subscribe(result => {
   if (result["success"] == true) {
    this.institutionList = result["institutionList"]; 
    }
 });
}
//institution reg 
getTitle(bookId) {
  var value;
  this.institutionList.forEach(element => {
    if(element.id===bookId){
      value =  element.text;
      this.unregistered = "" ;
      this.isunregIns = true;
    }
  });
  return value;
}  


/// DegreeList auto complete 
onSearchDegree(value: string) {
  if (value.length > 0) {
    this.IsDegreeListShow = true;
    this.searchDegreeResults = this.degreeList.filter(Degree => Degree.text.toLowerCase().indexOf(value.toLowerCase()) > -1);
  } else {
    this.IsDegreeListShow = false;
    this.searchDegreeResults = [];
  }
}

selectDegree(institutionName: string,id:string) {
  this.selectDegreeSet = institutionName;
  this.IsDegreeListShow = false;
  this.institutionid = id;
  this.searchDegreeResults = [];
  this.searchCtrl.setValue('');
}
getDegreeList(){
  var degreeListUrl = "api/auth/app/IndividualProfileDetails/degreeList";
  this.storageservice.getrequest(degreeListUrl).subscribe(result => {
   if (result["success"] == true) {
    this.degreeList = result["degreeList"]; 
    }
 });
}

   
   


    ///studyList auto complete 
onSearchStudy(value: string) {
  if (value.length > 0) {
    this.IsstudyListShow = true;
    this.searchStudyResults = this.studyList.filter(study => study.text.toLowerCase().indexOf(value.toLowerCase()) > -1);
  } else {
    this.IsstudyListShow = false;
    this.searchStudyResults = [];
  }
}

selectStudy(Study: string,id:string) {
  this.selectStudySet = Study;
  this.IsstudyListShow = false;
  //this.institutionid = id;
  this.searchStudyResults = [];
  this.searchCtrl.setValue('');
}
getStudyList(){
  var StudyListUrl = "api/auth/app/IndividualProfileDetails/studyList";
  this.storageservice.getrequest(StudyListUrl).subscribe(result => {
   if (result["success"] == true) {
    this.studyList = result["studyList"]; 
    }
 });
}
    
      save(){


        if(this.unregistered == ""){
          this.EducationForm.value.unregisteredIns = this.Exp.orgName;
         }else{
          this.EducationForm.value.unregisteredIns = this.unregistered;
         }
    
this.EducationForm.value.courseStart =formatDate(this.EducationForm.value.courseStart, 'MM/yyyy','en-IN');
this.EducationForm.value.courseEnd=formatDate(this.EducationForm.value.courseEnd, 'MM/yyyy','en-IN');

console.log(this.fromdate);
this.EducationForm.value;
this.EducationForm.value.unregisteredIns = this.unregistered;
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
       this.router.navigate(['/profile-view']);
    }
}

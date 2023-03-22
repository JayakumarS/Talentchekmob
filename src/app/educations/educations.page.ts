import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(public router:Router,public storageservice:StorageService,private fb: FormBuilder) { }

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

    var listConstant =  this.initializeItems(); 
    var listConstant =  this.DegreeListItems(); 
    var listConstant =  this.studyListItems();
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
    // this.ionSearchListShow = false;
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


    // getstudyList(){
    //   var getstudyListUrl = "api/auth/app/IndividualProfileDetails/studyList";
         
    //   this.storageservice.getrequest(getstudyListUrl).subscribe(result => {
    //    if (result["success"] == true) {
    //     this.studyList = result["studyList"]; 
    //    }
    //  });
    // }

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
}

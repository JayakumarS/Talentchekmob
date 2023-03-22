import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
//import { CKEditor4 } from 'ckeditor4-angular';

@Component({
  selector: 'app-work-experiences',
  //template: '<ckeditor [(ngModel)]="content" [config]="editorConfig"></ckeditor>',
  templateUrl: './work-experiences.page.html',
  styleUrls: ['./work-experiences.page.scss'],

 
})
export class WorkExperiencesPage implements OnInit {

  // myForm = new FormGroup({

  // });
  // content: string;
  // editorConfig: CKEditor4.Config = {
  //   toolbar: [
  //     { name: 'clipboard', items: ['Undo', 'Redo'] },
  //     { name: 'styles', items: ['Styles', 'Format'] },
  //     { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike'] },
  //     { name: 'paragraph', items: ['NumberedList', 'BulletedList'] },
  //     { name: 'links', items: ['Link', 'Unlink'] },
  //     { name: 'tools', items: ['Maximize'] },
  //     { name: 'document', items: ['Source'] },
  //   ],
  // };








  // public Editor: any = ClassicEditor;

  ExperienceForm:  FormGroup;
  organisationList: any;
  IsorgListShow:boolean= false;
  institutionVal: any;
  organisationVal: any;
  jobTypeList: any;
  
 
  constructor(public router:Router,private fb: FormBuilder,public storageservice:StorageService) { }

  ngOnInit() {

    this.ExperienceForm= this.fb.group({
      designation: [""],
      organisationName: [""],
      department: [""],
      registrationNumber: [""],
      expStartObj:[""],
      expStart: [""],
      expEndObj:[""],
      expEnd: [""],
      currentlyWork: [""],
      jobType: [""],
      orgLocation: [""],
      expDescription: [""],
      expId:[""],
      checked:[""],
      unregisteredOrg:[""],
      ckeditor:[""],
      currentUserId:[""]
   });
this.getJobtype();
   var listConstant =  this.initializeItems(); 
  }
  certifications()
  {
    this.router.navigate(['/profile/addCertifications']) 
  }
  education()
  {
    this.router.navigate(['/profile/addEducation']) 
  }


   //organisationList
   unCheckFocus() {
    // this.ionSearchListShow = false;
  }
  goToSearchSelectedItem( instName,instId) {
    console.log("InsName: " + instName)
    console.log("InsId: " + instId)
    
    this.organisationVal = instName;
    this.ExperienceForm.value.organisationName = instId;
    this.IsorgListShow = false;
    //this.getstatelist(CtryId);
  }
    async initializeItems(): Promise<any> {
  
      var organisationListUrl = "api/auth/app/IndividualProfileDetails/organisationList";
      const InsList = this.storageservice.getrequest(organisationListUrl).subscribe(result => {
        this.organisationList = result["organisationList"];
        this.organisationList = result["organisationList"];
     //   console.log(`countryResponse: ${JSON.stringify(this.countryResponse)}`);
      });
    
      return InsList;
    }
    async filterList(evt) {
      if (evt.srcElement.value != null && evt.srcElement.value != '') {
        this.IsorgListShow = true;
        this.organisationList = this.organisationList;
        const searchTerm = evt.srcElement.value;
        if (!searchTerm) {
          return;
        }
    
        var countVal = 0;
        this.organisationList = this.organisationList.filter(currentinstitution => {
          countVal++;
          if (currentinstitution.text && searchTerm && countVal < 100) {
            return (currentinstitution.text.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
          }
        });
    
        if (this.organisationList == 0) {
          this.IsorgListShow = false;
        }
        else {
          this.IsorgListShow = true;
        }
      }
      else {
        this.IsorgListShow = false;
      }
    }

    //Jobtype
    getJobtype(){
      var getjobTypeListUrl= "api/auth/app/jobportal/jobTypeList";
         
      this.storageservice.getrequest(getjobTypeListUrl).subscribe(result => {
       if (result["success"] == true) {
        this.jobTypeList = result["jobTypeList"]; 
       }
     });
    }
    Update(){
      this.ExperienceForm;


    }
}

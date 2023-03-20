import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-skill-popup',
  templateUrl: './skill-popup.page.html',
  styleUrls: ['./skill-popup.page.scss'],
})
export class SkillPopupPage implements OnInit {
  skillsList: any;
  skillForm : FormGroup;
  IsSkillsListShow: boolean = false;
  degreeListVal: any;
  skillsListVal: any;
  constructor(public modalController: ModalController,private fb: FormBuilder,public storageservice:StorageService) { }
  dismiss() {
    this.modalController.dismiss();
  }

  ngOnInit() {

    this.skillForm = this.fb.group({
      keySkill:[""],
      expertise:[""],
      skillId:[""],
      currentUserId:[""]
    })
    var listConstant =  this.SkillsListItems();
  }

   // SkillsList
   unSkillsList() {
    // this.ionSearchListShow = false;
  }
  goToSkillsListItem( instName,instId) {
    console.log("InsName: " + instName)
    console.log("InsId: " + instId)
    
    this.skillsListVal = instName;
    this.skillForm.value.keySkill = instId;
    this.IsSkillsListShow = false;
    //this.getstatelist(CtryId);
  }
    async SkillsListItems(): Promise<any> {
  
      var SkillsListUrl = "api/auth/app/CommonUtility/skillList";
      const InsList = this.storageservice.getrequest(SkillsListUrl).subscribe(result => {
        this.skillsList = result["skillsList"];
        this.skillsList = result["skillsList"];
     //   console.log(`countryResponse: ${JSON.stringify(this.countryResponse)}`);
      });
    
      return InsList;
    }
    async filterskillsList(evt) {
      if (evt.srcElement.value != null && evt.srcElement.value != '') {
        this.IsSkillsListShow = true;
        this.skillsList = this.skillsList;
        const searchTerm = evt.srcElement.value;
        if (!searchTerm) {
          return;
        }
    
        var countVal = 0;
        this.skillsList = this.skillsList.filter(currentskillsList => {
          countVal++;
          if (currentskillsList.text && searchTerm && countVal < 100) {
            return (currentskillsList.text.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
          }
        });
    
        if (this.skillsList == 0) {
          this.IsSkillsListShow = false;
        }
        else {
          this.IsSkillsListShow = true;
        }
      }
      else {
        this.IsSkillsListShow = false;
      }
    }

}

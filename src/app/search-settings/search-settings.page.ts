import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-search-settings',
  templateUrl: './search-settings.page.html',
  styleUrls: ['./search-settings.page.scss'],
})
export class SearchSettingsPage implements OnInit {


  IsSkill_SLShow: boolean = false;
  public SkillList: any;
  public SkillListBackup: any;
  skill: string = "";

  constructor(public router:Router,public storageservice: StorageService) { }

  async ngOnInit() {


  }
  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }


  async initializeItems_Skill(): Promise<any> {

    var SkillURL = "api/auth/app/IndividualProfileDetails/skillList";

    const SkillList = this.storageservice.getrequest(SkillURL).subscribe(result => {
      this.SkillListBackup = result['getModuleList'];
      this.SkillList = result['getModuleList'];
      console.log(`CountryList: ${JSON.stringify(this.SkillList)}`);
    });

    return SkillList;
  }


  goToCountrySearch_SelectedItem(skillName, skillId) {
    console.log("countryName: " + skillName)
    console.log("countryId: " + skillId)

    let fullname = skillName;
    let names = fullname.split("-");
    let cnName = names[1];
    console.log("cnName: " + cnName)

    this.skill = cnName;
    this.IsSkill_SLShow = false;
  }
  async filterCountryList(evt) {
    this.IsSkill_SLShow = true;
    this.SkillList = this.SkillListBackup;
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      return;
    }

    this.SkillList = this.SkillList.filter(currentFood => {
      if (currentFood.text && searchTerm) {
        return (currentFood.text.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });

    if (this.SkillList == 0) {
      this.IsSkill_SLShow = false;
    }
    else {
      this.IsSkill_SLShow = true;
    }
  }

  unCheckFocus_Country() {
    console.log("unCheckFocus_Country: ")
    //this.IsCountry_SLShow = false;
  }


  onClickCountry(event) {
    console.log('onClickName event caught');

    this.IsSkill_SLShow = false;
 
  }

  searchresults(){
    this.router.navigate(['/search-results']) 
  }
}

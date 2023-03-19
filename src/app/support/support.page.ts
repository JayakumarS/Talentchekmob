import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

  addPersonalInfo : FormGroup;
  country: string = "";

  userId: string;
  userName: string;
  creditPoints: any;
  roleId: string;
 


  constructor(public formbuilder: FormBuilder,public storageservice: StorageService,) {


    
    this.userId = localStorage.getItem("userId");
    this.userName = localStorage.getItem("userName");
    this.creditPoints = localStorage.getItem("creditPoints");
    this.roleId = localStorage.getItem("roleId");
    
    this.addPersonalInfo = formbuilder.group({

      category: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      module : ['', Validators.compose([Validators.maxLength(20),Validators.required])],
      subject : ['', Validators.required],
      issueQuery :['', Validators.required],
    });
   }

  async ngOnInit() {

    var listCountry = await this.initializeItems_Country();

  }

  selectedTab: string = 'menu';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

  IsCountry_SLShow: boolean = false;
  public CountryList: any;
  public CountryListBackup: any;


  async initializeItems_Country(): Promise<any> {

    var InURL = "api/auth/app/Support/getModuleList"+"?roleId=" + this.roleId;

    const CountryList = this.storageservice.getrequest(InURL).subscribe(result => {
      this.CountryListBackup = result['getModuleList'];
      this.CountryList = result['getModuleList'];
      console.log(`CountryList: ${JSON.stringify(this.CountryList)}`);
    });

    return CountryList;
  }

  goToCountrySearch_SelectedItem(countryName, countryId) {
    console.log("countryName: " + countryName)
    console.log("countryId: " + countryId)

    let fullname = countryName;
    let names = fullname.split("-");
    let cnName = names[1];
    console.log("cnName: " + cnName)

    this.country = countryName;
    this.IsCountry_SLShow = false;
  }
  async filterCountryList(evt) {
    this.IsCountry_SLShow = true;
    this.CountryList = this.CountryListBackup;
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      return;
    }

    this.CountryList = this.CountryList.filter(currentFood => {
      if (currentFood.text && searchTerm) {
        return (currentFood.text.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });

    if (this.CountryList == 0) {
      this.IsCountry_SLShow = false;
    }
    else {
      this.IsCountry_SLShow = true;
    }
  }

  unCheckFocus_Country() {
    console.log("unCheckFocus_Country: ")
    //this.IsCountry_SLShow = false;
  }


  onClickCountry(event) {
    console.log('onClickName event caught');

    this.IsCountry_SLShow = false;
 
  }

 


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {

  constructor( public router: Router) { }

  ngOnInit() {

    

    this.setSelectedTab('search');
  }
  profile()
  {
    this.router.navigate(['/profilee']) 
  }
  educations()
  {
    this.router.navigate(['/educations']) 
  }
  experiences()
  {
    this.router.navigate(['/work-experiences']) 
  }
  Extracurricular()
  {
    this.router.navigate(['/Extracurricular']) 
  }
  Skill()
  {
    this.router.navigate(['/certification']) 
  }
  Connections()
  {
    this.router.navigate(['/connection']) 
  }
  Additional(){
    this.router.navigate(['/additional-infoo']) 

  }
  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

}

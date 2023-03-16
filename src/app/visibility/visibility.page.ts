import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-visibility',
  templateUrl: './visibility.page.html',
  styleUrls: ['./visibility.page.scss'],
})
export class VisibilityPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

  profile_vis(){
    this.router.navigate(['/profile-visibility'])
  }

  email_vis(){
    this.router.navigate(['/email-visibility'])
  }

  phone_vis(){
    this.router.navigate(['/phone-visibility'])
  }

  goto_settings(){
    this.router.navigate(['/settings']) 
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-search-settings',
  templateUrl: './search-settings.page.html',
  styleUrls: ['./search-settings.page.scss'],
})
export class SearchSettingsPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

  searchresults(){
    this.router.navigate(['/search-results']) 
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-settings',
  templateUrl: './search-settings.page.html',
  styleUrls: ['./search-settings.page.scss'],
})
export class SearchSettingsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }
}

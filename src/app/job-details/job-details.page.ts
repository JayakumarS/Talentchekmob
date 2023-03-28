import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPage implements OnInit {

  constructor(public router:Router,private route: ActivatedRoute) { 

    
    this.route.queryParams.subscribe(params => {
      if (params) {
  
        if (params != null) {

          console.log(params);
        }
      }
    });
  }

  ngOnInit() {
  }

  selectedTab: string = 'earth';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }
  
  goto_job(){
    this.router.navigate(['/job']) 
  }
  Apply(){

    this.router.navigate(['/apply-for-job']) 

  }

}

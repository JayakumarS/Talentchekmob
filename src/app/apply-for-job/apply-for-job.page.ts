import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-for-job',
  templateUrl: './apply-for-job.page.html',
  styleUrls: ['./apply-for-job.page.scss'],
})
export class ApplyForJobPage implements OnInit {

  constructor(public router: Router,) { }

  ngOnInit() {
  }
  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }
  Apply(){

    this.router.navigate(['/job']); 

  }

  go_to_jobs(){
    this.router.navigate(['/job']);
  }
}

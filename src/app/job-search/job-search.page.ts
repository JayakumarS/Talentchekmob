import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.page.html',
  styleUrls: ['./job-search.page.scss'],
})

export class JobSearchPage implements OnInit {
  jobSearchHeadForm : FormGroup;
  jobSearchForm : FormGroup;
  uls :any = [];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.jobSearchHeadForm = this.fb.group({
      searchType :["talentid"],
      searchValue :[""]
    })
    this.uls = document.querySelectorAll("ul");

    this.uls.forEach((ul) => {
      const resetClass = ul.parentNode.getAttribute("class");
      const lis = ul.querySelectorAll("li");

      lis.forEach((li) => {
        li.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const target = e.currentTarget;
    
          if (
            target.classList.contains("active") ||
            target.classList.contains("follow")
          ) {
            return;
          }
    
          ul.parentNode.setAttribute(
            "class",
            `${resetClass} ${target.getAttribute("data-where")}-style`
          );
    
          lis.forEach((item) => this.clearClass(item, "active"));
    
          this.setClass(target, "active");
        });
      });
    });

  }
  
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  search(){
   console.log(this.jobSearchHeadForm.value); 
  }
  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }
  clearClass(node, className) {
    node.classList.remove(className);
  }
  
  setClass(node, className) {
    node.classList.add(className);
  }
 
}

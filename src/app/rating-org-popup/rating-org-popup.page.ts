import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rating-org-popup',
  templateUrl: './rating-org-popup.page.html',
  styleUrls: ['./rating-org-popup.page.scss'],
})
export class RatingOrgPopupPage implements OnInit {

  ExperienceForm: FormGroup;

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  constructor(public fb: FormBuilder) { }

  ngOnInit() {

    
    this.ExperienceForm= this.fb.group({
    
      remarks: [""],
      rating: [""],
      expId: [""],
      currentUserId: [""]
   });
  }

    ///rating  star
    countStar(star) {
      this.selectedValue = star;
      this.ExperienceForm.patchValue({
        'rating': this.selectedValue,
        }),
      console.log('Value of star', this.selectedValue);
    }
}

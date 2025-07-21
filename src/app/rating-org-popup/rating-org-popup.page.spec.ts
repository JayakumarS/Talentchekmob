import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RatingOrgPopupPage } from './rating-org-popup.page';

describe('RatingOrgPopupPage', () => {
  let component: RatingOrgPopupPage;
  let fixture: ComponentFixture<RatingOrgPopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingOrgPopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RatingOrgPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

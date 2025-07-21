import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfileViewPopupPage } from './profile-view-popup.page';

describe('ProfileViewPopupPage', () => {
  let component: ProfileViewPopupPage;
  let fixture: ComponentFixture<ProfileViewPopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileViewPopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileViewPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

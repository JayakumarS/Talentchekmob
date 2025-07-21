import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfileVcardPage } from './profile-vcard.page';

describe('ProfileVcardPage', () => {
  let component: ProfileVcardPage;
  let fixture: ComponentFixture<ProfileVcardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileVcardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileVcardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

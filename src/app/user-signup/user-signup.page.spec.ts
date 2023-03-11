import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserSignupPage } from './user-signup.page';

describe('UserSignupPage', () => {
  let component: UserSignupPage;
  let fixture: ComponentFixture<UserSignupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSignupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserSignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

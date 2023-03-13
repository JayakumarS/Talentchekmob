import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignUpInstitutionPage } from './sign-up-institution.page';

describe('SignUpInstitutionPage', () => {
  let component: SignUpInstitutionPage;
  let fixture: ComponentFixture<SignUpInstitutionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpInstitutionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpInstitutionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

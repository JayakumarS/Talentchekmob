import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcademicVerifierDetailsPage } from './academic-verifier-details.page';

describe('AcademicVerifierDetailsPage', () => {
  let component: AcademicVerifierDetailsPage;
  let fixture: ComponentFixture<AcademicVerifierDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicVerifierDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcademicVerifierDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

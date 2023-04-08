import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EduVerifierDetailsPage } from './edu-verifier-details.page';

describe('EduVerifierDetailsPage', () => {
  let component: EduVerifierDetailsPage;
  let fixture: ComponentFixture<EduVerifierDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EduVerifierDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EduVerifierDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAcademicInformationPage } from './add-academic-information.page';

describe('AddAcademicInformationPage', () => {
  let component: AddAcademicInformationPage;
  let fixture: ComponentFixture<AddAcademicInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAcademicInformationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAcademicInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

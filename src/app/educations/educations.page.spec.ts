import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EducationsPage } from './educations.page';

describe('EducationsPage', () => {
  let component: EducationsPage;
  let fixture: ComponentFixture<EducationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EducationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

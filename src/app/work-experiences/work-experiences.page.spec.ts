import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkExperiencesPage } from './work-experiences.page';

describe('WorkExperiencesPage', () => {
  let component: WorkExperiencesPage;
  let fixture: ComponentFixture<WorkExperiencesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkExperiencesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkExperiencesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

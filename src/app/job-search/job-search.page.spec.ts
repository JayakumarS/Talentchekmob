import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobSearchPage } from './job-search.page';

describe('JobSearchPage', () => {
  let component: JobSearchPage;
  let fixture: ComponentFixture<JobSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

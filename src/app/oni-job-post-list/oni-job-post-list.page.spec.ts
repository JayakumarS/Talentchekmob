import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OniJobPostListPage } from './oni-job-post-list.page';

describe('OniJobPostListPage', () => {
  let component: OniJobPostListPage;
  let fixture: ComponentFixture<OniJobPostListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OniJobPostListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OniJobPostListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApplyForJobPage } from './apply-for-job.page';

describe('ApplyForJobPage', () => {
  let component: ApplyForJobPage;
  let fixture: ComponentFixture<ApplyForJobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyForJobPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApplyForJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

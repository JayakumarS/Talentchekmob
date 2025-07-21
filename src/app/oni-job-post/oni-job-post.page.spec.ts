import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OniJobPostPage } from './oni-job-post.page';

describe('OniJobPostPage', () => {
  let component: OniJobPostPage;
  let fixture: ComponentFixture<OniJobPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OniJobPostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OniJobPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

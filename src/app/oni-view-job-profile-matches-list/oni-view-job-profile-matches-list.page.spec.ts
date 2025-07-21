import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OniViewJobProfileMatchesListPage } from './oni-view-job-profile-matches-list.page';

describe('OniViewJobProfileMatchesListPage', () => {
  let component: OniViewJobProfileMatchesListPage;
  let fixture: ComponentFixture<OniViewJobProfileMatchesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OniViewJobProfileMatchesListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OniViewJobProfileMatchesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

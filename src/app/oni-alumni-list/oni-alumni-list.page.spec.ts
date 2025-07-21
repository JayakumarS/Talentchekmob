import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OniAlumniListPage } from './oni-alumni-list.page';

describe('OniAlumniListPage', () => {
  let component: OniAlumniListPage;
  let fixture: ComponentFixture<OniAlumniListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OniAlumniListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OniAlumniListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

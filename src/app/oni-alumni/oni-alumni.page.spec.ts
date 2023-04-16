import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OniAlumniPage } from './oni-alumni.page';

describe('OniAlumniPage', () => {
  let component: OniAlumniPage;
  let fixture: ComponentFixture<OniAlumniPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OniAlumniPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OniAlumniPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

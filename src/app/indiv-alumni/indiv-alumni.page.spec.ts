import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IndivAlumniPage } from './indiv-alumni.page';

describe('IndivAlumniPage', () => {
  let component: IndivAlumniPage;
  let fixture: ComponentFixture<IndivAlumniPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndivAlumniPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IndivAlumniPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

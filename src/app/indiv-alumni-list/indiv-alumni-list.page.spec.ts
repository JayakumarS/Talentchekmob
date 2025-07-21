import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IndivAlumniListPage } from './indiv-alumni-list.page';

describe('IndivAlumniListPage', () => {
  let component: IndivAlumniListPage;
  let fixture: ComponentFixture<IndivAlumniListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndivAlumniListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IndivAlumniListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

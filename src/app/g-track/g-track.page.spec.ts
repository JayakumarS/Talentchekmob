import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GTrackPage } from './g-track.page';

describe('GTrackPage', () => {
  let component: GTrackPage;
  let fixture: ComponentFixture<GTrackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GTrackPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GTrackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

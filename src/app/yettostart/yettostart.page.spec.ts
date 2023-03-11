import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { YettostartPage } from './yettostart.page';

describe('YettostartPage', () => {
  let component: YettostartPage;
  let fixture: ComponentFixture<YettostartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YettostartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(YettostartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

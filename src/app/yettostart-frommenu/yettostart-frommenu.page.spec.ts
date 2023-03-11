import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { YettostartFrommenuPage } from './yettostart-frommenu.page';

describe('YettostartFrommenuPage', () => {
  let component: YettostartFrommenuPage;
  let fixture: ComponentFixture<YettostartFrommenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YettostartFrommenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(YettostartFrommenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WebAppNavPage } from './web-app-nav.page';

describe('WebAppNavPage', () => {
  let component: WebAppNavPage;
  let fixture: ComponentFixture<WebAppNavPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebAppNavPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WebAppNavPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchPopupPage } from './search-popup.page';

describe('SearchPopupPage', () => {
  let component: SearchPopupPage;
  let fixture: ComponentFixture<SearchPopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

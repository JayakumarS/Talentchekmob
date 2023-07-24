import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CallEntryPage } from './call-entry.page';

describe('CallEntryPage', () => {
  let component: CallEntryPage;
  let fixture: ComponentFixture<CallEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallEntryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CallEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

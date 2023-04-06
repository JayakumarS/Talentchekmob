import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanToConnectPage } from './scan-to-connect.page';

describe('ScanToConnectPage', () => {
  let component: ScanToConnectPage;
  let fixture: ComponentFixture<ScanToConnectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanToConnectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanToConnectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

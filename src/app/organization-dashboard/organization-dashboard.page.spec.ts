import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrganizationDashboardPage } from './organization-dashboard.page';

describe('OrganizationDashboardPage', () => {
  let component: OrganizationDashboardPage;
  let fixture: ComponentFixture<OrganizationDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizationDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

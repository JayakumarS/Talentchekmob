import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrganizationDashboardListPage } from './organization-dashboard-list.page';

describe('OrganizationDashboardListPage', () => {
  let component: OrganizationDashboardListPage;
  let fixture: ComponentFixture<OrganizationDashboardListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationDashboardListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizationDashboardListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

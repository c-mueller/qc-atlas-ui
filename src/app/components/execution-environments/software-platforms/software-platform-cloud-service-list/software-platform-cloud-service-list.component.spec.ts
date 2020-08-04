import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwarePlatformCloudServiceListComponent } from './software-platform-cloud-service-list.component';

describe('SoftwarePlatformCloudServiceListComponent', () => {
  let component: SoftwarePlatformCloudServiceListComponent;
  let fixture: ComponentFixture<SoftwarePlatformCloudServiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftwarePlatformCloudServiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwarePlatformCloudServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

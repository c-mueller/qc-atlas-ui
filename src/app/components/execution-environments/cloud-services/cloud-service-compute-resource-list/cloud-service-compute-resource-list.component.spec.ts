import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudServiceComputeResourceListComponent } from './cloud-service-compute-resource-list.component';

describe('CloudServiceComputeResourceListComponent', () => {
  let component: CloudServiceComputeResourceListComponent;
  let fixture: ComponentFixture<CloudServiceComputeResourceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudServiceComputeResourceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudServiceComputeResourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

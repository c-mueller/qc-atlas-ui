import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwarePlatformComputeResourceListComponent } from './software-platform-compute-resource-list.component';

describe('SoftwarePlatformComputeResourceListComponent', () => {
  let component: SoftwarePlatformComputeResourceListComponent;
  let fixture: ComponentFixture<SoftwarePlatformComputeResourceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftwarePlatformComputeResourceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwarePlatformComputeResourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

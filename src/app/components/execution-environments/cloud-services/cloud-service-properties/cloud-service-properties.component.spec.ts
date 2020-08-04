import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudServicePropertiesComponent } from './cloud-service-properties.component';

describe('CloudServicePropertiesComponent', () => {
  let component: CloudServicePropertiesComponent;
  let fixture: ComponentFixture<CloudServicePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudServicePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudServicePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

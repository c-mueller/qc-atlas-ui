import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwarePlatformPropertiesComponent } from './software-platform-properties.component';

describe('SoftwarePlatformPropertiesComponent', () => {
  let component: SoftwarePlatformPropertiesComponent;
  let fixture: ComponentFixture<SoftwarePlatformPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftwarePlatformPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwarePlatformPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

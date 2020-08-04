import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwarePlatformImplListComponent } from './software-platform-impl-list.component';

describe('SoftwarePlatformImplListComponent', () => {
  let component: SoftwarePlatformImplListComponent;
  let fixture: ComponentFixture<SoftwarePlatformImplListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftwarePlatformImplListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwarePlatformImplListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

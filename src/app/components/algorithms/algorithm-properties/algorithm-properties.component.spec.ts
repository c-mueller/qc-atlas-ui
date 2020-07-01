import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmPropertiesComponent } from './algorithm-properties.component';

describe('AlgorithmPropertiesComponent', () => {
  let component: AlgorithmPropertiesComponent;
  let fixture: ComponentFixture<AlgorithmPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlgorithmPropertiesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

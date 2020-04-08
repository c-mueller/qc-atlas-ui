import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NisqAnalyzerComponent } from './nisq-analyzer.component';

describe('NisqAnalyzerComponent', () => {
  let component: NisqAnalyzerComponent;
  let fixture: ComponentFixture<NisqAnalyzerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NisqAnalyzerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NisqAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

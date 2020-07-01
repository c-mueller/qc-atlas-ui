import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmImplementationsListComponent } from './algorithm-implementations-list.component';

describe('AlgorithmImplementationsListComponent', () => {
  let component: AlgorithmImplementationsListComponent;
  let fixture: ComponentFixture<AlgorithmImplementationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlgorithmImplementationsListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmImplementationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmRelatedAlgosListComponent } from './algorithm-related-algos-list.component';

describe('AlgorithmRelatedAlgosListComponent', () => {
  let component: AlgorithmRelatedAlgosListComponent;
  let fixture: ComponentFixture<AlgorithmRelatedAlgosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlgorithmRelatedAlgosListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmRelatedAlgosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

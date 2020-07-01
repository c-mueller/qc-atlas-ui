import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmPublicationsListComponent } from './algorithm-publications-list.component';

describe('AlgorithmPublicationsListComponent', () => {
  let component: AlgorithmPublicationsListComponent;
  let fixture: ComponentFixture<AlgorithmPublicationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlgorithmPublicationsListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmPublicationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

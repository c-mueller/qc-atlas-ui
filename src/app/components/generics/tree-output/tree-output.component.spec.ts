import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeOutputComponent } from './tree-output.component';

describe('TreeOutputComponent', () => {
  let component: TreeOutputComponent;
  let fixture: ComponentFixture<TreeOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

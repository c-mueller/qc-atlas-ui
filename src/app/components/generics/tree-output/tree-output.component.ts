/* eslint-disable @typescript-eslint/member-ordering */
// eslint-disable-next-line max-classes-per-file
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject, of as observableOf } from 'rxjs';
import { EntityModelProblemTypeDto } from 'api/models/entity-model-problem-type-dto';

export class FileNode {
  problemType: EntityModelProblemTypeDto;
  parents?: FileNode[];
}

@Component({
  selector: 'app-tree-output',
  templateUrl: './tree-output.component.html',
  styleUrls: ['./tree-output.component.scss'],
})
export class TreeOutputComponent implements OnInit, OnChanges {
  @Output() onAddElement: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemoveElement: EventEmitter<any> = new EventEmitter<any>();
  @Output() onExpandParents: EventEmitter<
    EntityModelProblemTypeDto
  > = new EventEmitter<EntityModelProblemTypeDto>();
  @Input() name = '';
  @Input() treeData: FileNode[];

  nestedTreeControl: NestedTreeControl<FileNode> = new NestedTreeControl<
    FileNode
  >((node) => node.parents);
  nestedDataSource: MatTreeNestedDataSource<
    FileNode
  > = new MatTreeNestedDataSource<FileNode>();
  dataChange: BehaviorSubject<FileNode[]> = new BehaviorSubject<FileNode[]>([]);

  constructor() {
    this.nestedDataSource = new MatTreeNestedDataSource();
  }

  ngOnInit(): void {
    this.dataChange.subscribe((data) => (this.nestedDataSource.data = data));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataChange.next(this.treeData);
    console.log(changes);
  }

  isTreeDataInvalid(): boolean {
    return this.treeData == null || this.treeData.length <= 0;
  }

  addElement(): void {
    this.onAddElement.emit();
    // console.log(this.treeData);
  }

  removeElement(): void {
    this.onRemoveElement.emit();
    console.log(this.treeData);
  }

  expandParents(node): void {}

  hasNestedChild = (_: number, nodeData: FileNode) =>
    nodeData.parents.length > 0;
}

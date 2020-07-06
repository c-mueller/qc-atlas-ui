// eslint-disable-next-line max-classes-per-file
import { Component, Input, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject, of as observableOf } from 'rxjs';

export class FileNode {
  children: FileNode[];
  filename: string;
}

@Component({
  selector: 'app-tree-output',
  templateUrl: './tree-output.component.html',
  styleUrls: ['./tree-output.component.scss'],
})
export class TreeOutputComponent implements OnInit {
  @Input() name = '';
  @Input() data: FileNode[] = [
    {
      filename: 'default node',
      children: [],
    },
  ];

  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;
  dataChange: BehaviorSubject<FileNode[]> = new BehaviorSubject<FileNode[]>([]);

  constructor() {
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this.getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.dataChange.subscribe((data) => (this.nestedDataSource.data = data));

    this.dataChange.next(this.data);
  }

  ngOnInit(): void {}

  getChildren = (node: FileNode) => observableOf(node.children);

  hasNestedChild = (_: number, nodeData: FileNode) =>
    nodeData.children.length > 0;
}

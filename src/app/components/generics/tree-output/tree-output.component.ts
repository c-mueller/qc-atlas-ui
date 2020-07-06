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
  @Input() treeData: FileNode[] = [
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

    // this data structure is identical to the test data in algorithm-properties.component.ts
    // uncomment the following lines to set the test data

    // this.treeData = [
    //   {
    //     filename: 'problem-type 1',
    //     children: [
    //       {
    //         filename: 'parent problem-type 1',
    //         children: [
    //           {
    //             filename: 'parent problem-type 2',
    //             children: [],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     filename: 'problem-type 2',
    //     children: [
    //       {
    //         filename: 'parent problem-type 1',
    //         children: [],
    //       },
    //       {
    //         filename: 'parent problem-type 3',
    //         children: [],
    //       },
    //     ],
    //   },
    // ];

    this.dataChange.next(this.treeData);
  }

  ngOnInit(): void {}

  getChildren = (node: FileNode) => observableOf(node.children);

  hasNestedChild = (_: number, nodeData: FileNode) =>
    nodeData.children.length > 0;
}

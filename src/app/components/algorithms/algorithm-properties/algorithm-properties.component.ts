import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityModelAlgorithmDto } from 'api/models/entity-model-algorithm-dto';
import { AlgorithmService } from 'api/services/algorithm.service';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject, observable, of as observableOf } from 'rxjs';
import { NestedTreeControl } from '@angular/cdk/tree';

export class FileNode {
  children: FileNode[];
  filename: string;
  type: any;
}
@Component({
  selector: 'app-algorithm-properties',
  templateUrl: './algorithm-properties.component.html',
  styleUrls: ['./algorithm-properties.component.scss'],
})
export class AlgorithmPropertiesComponent implements OnInit {
  @Output() addApplicationArea: EventEmitter<string> = new EventEmitter<
    string
  >();
  @Output() removeApplicationArea: EventEmitter<string> = new EventEmitter<
    string
  >();
  @Input() algorithm: EntityModelAlgorithmDto;

  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;
  dataChange: BehaviorSubject<FileNode[]> = new BehaviorSubject<FileNode[]>([]);

  sketchOptions: string[] = ['PSEUDOCODE', 'CIRCUIT', 'ISING_MODEL'];

  constructor(private algorithmService: AlgorithmService) {
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this.getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.dataChange.subscribe((data) => (this.nestedDataSource.data = data));

    this.dataChange.next([
      {
        filename: 'folder',
        type: '',
        children: [
          {
            filename: 'test3',
            type: 'exe',
            children: [],
          },
        ],
      },
      {
        filename: 'test2',
        type: 'exe',
        children: [],
      },
    ]);
  }

  ngOnInit(): void {}

  onChangesSaved(value): void {
    console.log(value);
  }

  addApplicationAreaEvent(applicationArea: string): void {
    this.addApplicationArea.emit(applicationArea);
  }

  removeApplicationAreaEvent(applicationArea: string): void {
    this.removeApplicationArea.emit(applicationArea);
  }

  getChildren = (node: FileNode) => observableOf(node.children);

  hasNestedChild = (_: number, nodeData: FileNode) => !nodeData.type;
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityModelAlgorithmDto } from 'api/models/entity-model-algorithm-dto';
import { AlgorithmService } from 'api/services/algorithm.service';
import { ComputingResourceDto } from 'api/models/computing-resource-dto';
import {
  EntityModelComputingResourceDto,
  EntityModelComputingResourceTypeDto,
} from 'api/models';
import { FileNode } from '../../generics/tree-output/tree-output.component';

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

  sketchOptions: string[] = ['PSEUDOCODE', 'CIRCUIT', 'ISING_MODEL'];
  computeResourceProperties: EntityModelComputingResourceDto[] = [];

  // parent problem types data for testing purposes of output tree
  problemTypeTreeData: FileNode[] = [
    {
      filename: 'problem-type 1',
      children: [
        {
          filename: 'parent problem-type 1',
          children: [
            {
              filename: 'parent problem-type 2',
              children: [],
            },
          ],
        },
      ],
    },
    {
      filename: 'problem-type 2',
      children: [
        {
          filename: 'parent problem-type 1',
          children: [],
        },
        {
          filename: 'parent problem-type 3',
          children: [],
        },
      ],
    },
  ];

  constructor(private algorithmService: AlgorithmService) {}

  ngOnInit(): void {
    this.createDummyCompureResourceProperties();
  }

  onChangesSaved(value): void {
    console.log(value);
  }

  addApplicationAreaEvent(applicationArea: string): void {
    this.addApplicationArea.emit(applicationArea);
  }

  removeApplicationAreaEvent(applicationArea: string): void {
    this.removeApplicationArea.emit(applicationArea);
  }

  createDummyCompureResourceProperties(): void {
    for (let i = 0; i < 10; i++) {
      const element: EntityModelComputingResourceDto = {
        id: i.toString(),
        type: {
          name: 'variable' + i,
          datatype: 'INTEGER',
          description: 'this is a test description',
        },
        value: 'value',
      };
      this.computeResourceProperties.push(JSON.parse(JSON.stringify(element)));
    }
  }
}

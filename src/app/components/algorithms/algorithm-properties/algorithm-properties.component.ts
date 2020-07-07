import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityModelAlgorithmDto } from 'api/models/entity-model-algorithm-dto';
import {
  EntityModelApplicationAreaDto,
  EntityModelComputingResourcePropertyDto,
  EntityModelProblemTypeDto,
} from 'api/models';
import { FileNode } from '../../generics/tree-output/tree-output.component';
import { Option } from '../../generics/property-input/select-input.component';

@Component({
  selector: 'app-algorithm-properties',
  templateUrl: './algorithm-properties.component.html',
  styleUrls: ['./algorithm-properties.component.scss'],
})
export class AlgorithmPropertiesComponent implements OnInit {
  @Output() addApplicationArea: EventEmitter<string> = new EventEmitter<
    string
  >();
  @Output() removeApplicationArea: EventEmitter<
    EntityModelApplicationAreaDto
  > = new EventEmitter<EntityModelApplicationAreaDto>();
  @Output() updateAlgorithmField: EventEmitter<{
    field;
    value;
  }> = new EventEmitter<{ field; value }>();
  @Input() algorithm: EntityModelAlgorithmDto;
  @Input() applicationAreas: EntityModelApplicationAreaDto[];
  @Input() problemTypes: EntityModelProblemTypeDto[];

  sketchOptions: Option[] = [
    { value: 'PSEUDOCODE', label: 'Pseudocode' },
    { value: 'CIRCUIT', label: 'Circuit' },
    { value: 'ISING_MODEL', label: 'Ising model' },
  ];
  quantumComputationModelOptions: Option[] = [
    { value: 'GATE_BASED', label: 'Gate based' },
    { value: 'MEASUREMENT_BASED', label: 'Measurement based' },
    { value: 'QUANTUM_ANNEALING', label: 'Quantum Annealing' },
  ];
  computeResourceProperties: EntityModelComputingResourcePropertyDto[] = [];

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

  constructor() {}

  ngOnInit(): void {
    this.createDummyCompureResourceProperties();
  }

  onChangesSaved(value: any, field: string): void {
    this.updateAlgorithmField.emit({ field, value });
  }

  addApplicationAreaEvent(applicationArea: string): void {
    this.addApplicationArea.emit(applicationArea);
  }

  removeApplicationAreaEvent(applicationArea: any): void {
    this.removeApplicationArea.emit(applicationArea);
  }

  addComputeResourceProperty(): void {
    console.log('add compute resource property');
  }

  createDummyCompureResourceProperties(): void {
    for (let i = 0; i < 5; i++) {
      const element: EntityModelComputingResourcePropertyDto = {
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

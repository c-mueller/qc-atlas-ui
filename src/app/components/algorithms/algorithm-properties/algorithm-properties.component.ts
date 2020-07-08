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
  @Input() problemTypeTrees: EntityModelProblemTypeDto[][];

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
  problemTypeTreeData: FileNode[];

  constructor() {}

  ngOnInit(): void {
    this.createDummyCompureResourceProperties();

    this.problemTypeTreeData = [];

    // const problem1: EntityModelProblemTypeDto = {
    //   name: 'ProblemTestType1',
    // };
    // const problem2: EntityModelProblemTypeDto = {
    //   name: 'ProblemTestType2',
    // };
    // const problem3: EntityModelProblemTypeDto = {
    //   name: 'ProblemParentTestType1',
    // };
    // const problem4: EntityModelProblemTypeDto = {
    //   name: 'ProblemParentTestType2',
    // };
    // const problem5: EntityModelProblemTypeDto = {
    //   name: 'ProblemParentTestType3',
    // };
    // const problem6: EntityModelProblemTypeDto = {
    //   name: 'ProblemParentTestType4',
    // };
    // const problem7: EntityModelProblemTypeDto = {
    //   name: 'ProblemParentTestType5',
    // };
    // this.problemTypeTrees = [
    //   [problem1, problem3, problem4, problem7],
    //   [problem2, problem5, problem6],
    // ];

    this.problemTypeTrees.forEach((problemTypeTree) => {
      let parent: FileNode[] = [
        { problemType: problemTypeTree.pop(), parents: [] },
      ];
      problemTypeTree.reverse().forEach((problemType) => {
        parent = [{ problemType, parents: parent }];
      });
      this.problemTypeTreeData = this.problemTypeTreeData.concat(parent);
    });
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

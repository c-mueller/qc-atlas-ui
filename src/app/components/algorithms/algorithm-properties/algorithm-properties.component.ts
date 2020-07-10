import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { EntityModelAlgorithmDto } from 'api/models/entity-model-algorithm-dto';
import {
  EntityModelApplicationAreaDto,
  EntityModelComputingResourcePropertyDto,
  EntityModelProblemTypeDto,
  ProblemTypeDto,
} from 'api/models';
import { MatDialog } from '@angular/material/dialog';
import { ProblemTypeService } from 'api/services/problem-type.service';
import { FileNode } from '../../generics/tree-output/tree-output.component';
import { Option } from '../../generics/property-input/select-input.component';
import { AddProblemTypeDialogComponent } from '../dialogs/add-problem-type-dialog.component';
import { RemoveProblemTypeDialogComponent } from '../dialogs/remove-problem-type-dialog.component';

@Component({
  selector: 'app-algorithm-properties',
  templateUrl: './algorithm-properties.component.html',
  styleUrls: ['./algorithm-properties.component.scss'],
})
export class AlgorithmPropertiesComponent implements OnInit, OnChanges {
  @Output() addApplicationArea: EventEmitter<string> = new EventEmitter<
    string
  >();
  @Output() removeApplicationArea: EventEmitter<
    EntityModelApplicationAreaDto
  > = new EventEmitter<EntityModelApplicationAreaDto>();
  @Output() addProblemType: EventEmitter<
    EntityModelProblemTypeDto
  > = new EventEmitter<EntityModelProblemTypeDto>();
  @Output() removeProblemType: EventEmitter<
    EntityModelProblemTypeDto[]
  > = new EventEmitter<EntityModelProblemTypeDto[]>();
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
  problemTypeTreeData: FileNode[] = [];

  constructor(
    private problemTypeService: ProblemTypeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createDummyCompureResourceProperties();

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
    // this.problemTypes = [problem1, problem2]; //
    // this.problemTypes.forEach((problemType) => {
    //   const node: FileNode = {
    //     problemType,
    //     parents: this.buildParentTree([problem2, problem3, problem4, problem5]),
    //   };
    //   this.problemTypeTreeData.push(JSON.parse(JSON.stringify(node)));
    // });
    // console.log(this.problemTypeTreeData);
  }

  buildParentTree(parents: EntityModelProblemTypeDto[]): FileNode[] {
    parents.shift();
    let parent: FileNode[] = [{ problemType: parents.pop(), parents: [] }];

    parents.reverse().forEach((problemType) => {
      parent = [{ problemType, parents: parent }];
    });

    return parent;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('problemTypes') && this.problemTypes != null) {
      this.problemTypeTreeData.slice(0, this.problemTypeTreeData.length);
      this.getParentListForProblemTypes();
    }
  }

  getParentListForProblemTypes(): void {
    this.problemTypes.forEach((problemType) =>
      this.addProblemTypeParentTree(problemType)
    );
  }

  addProblemTypeParentTree(problemType: EntityModelProblemTypeDto): void {
    this.problemTypeService
      .getProblemTypeParentList({ id: problemType.id })
      .subscribe(
        (parents) => {
          if (parents._embedded) {
            const parentProblemTypes = parents._embedded.problemTypes;
            let parentNodes: FileNode[] = [];
            if (parentProblemTypes.length > 1) {
              parentNodes = this.buildParentTree(parentProblemTypes);
            }
            const node: FileNode = {
              problemType,
              parents: parentNodes,
            };
            this.problemTypeTreeData.push(JSON.parse(JSON.stringify(node)));
          }
          console.log(
            'Tree data after parent tree api call',
            this.problemTypeTreeData.length,
            this.problemTypeTreeData
          );
        },
        (error) => {
          console.log(error);
        }
      );
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

  addProblemTypeEvent(): void {
    const dialogRef = this.dialog.open(AddProblemTypeDialogComponent, {
      width: '400px',
      data: { title: 'Add new problem type' },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const problemTypeDto: EntityModelProblemTypeDto = {
          name: dialogResult.name,
        };
        if (
          dialogResult.parentProblemType != null &&
          dialogResult.parentProblemType.id != null
        ) {
          problemTypeDto.parentProblemType = dialogResult.parentProblemType.id;
        }

        this.addProblemType.emit(problemTypeDto);
      }
    });
  }

  removeProblemTypeEvent(): void {
    const dialogRef = this.dialog.open(RemoveProblemTypeDialogComponent, {
      width: '400px',
      data: {
        title: 'Remove  problem type',
        existingProblemTypes: this.problemTypes,
        selectedProblemTypes: [],
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.removeProblemType.emit(dialogResult.selectedProblemTypes);
      }
    });
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

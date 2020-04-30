import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Algorithm } from '../../model/algorithm.model';
import { Util } from '../../util/Util';
import { AddParameterDialogComponent } from './dialogs/add-parameter-dialog.component';
import { Parameter } from '../../model/parameter.model';
import { MatDialog } from '@angular/material/dialog';
import { AlgorithmService } from '../../services/algorithm.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Implementation } from '../../model/implementation.model';
import { ImplementationService } from '../../services/implementation.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit, OnChanges {

  @Input() selectedAlgorithm: Algorithm;
  @Input() selectedImplementation: Implementation;
  displayedParametersColumns: string[] = ['name', 'type', 'description', 'restriction'];

  constructor(public dialog: MatDialog, private algorithmService: AlgorithmService, private snackBar: MatSnackBar,
              private implementationService: ImplementationService, private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.getAlgorithmById(this.selectedAlgorithm.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.handleSelectedAlgorithmChanges(changes);
    this.handleSelectedImplementationChanges(changes);
  }

  createParameter(parameterType: string) {
    this.selectedAlgorithm ? this.createAlgorithmParameter(parameterType) : this.createImplementationParameter(parameterType);
  }

  createAlgorithmParameter(parameterType: string): void {
    const dialogRef = this.dialog.open(AddParameterDialogComponent, {
      width: '400px',
      data: {title: 'Add new ' + parameterType + ' parameter'}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const parameter: Parameter = Util.createParameterFromDialogResult(dialogResult);
        this.algorithmService.addParameter(parameter, this.selectedAlgorithm.id, parameterType).subscribe(
          () => {
            this.getAlgorithmById(this.selectedAlgorithm.id);
            this.snackbarService.callSnackBar('parameter');
          });
      }
    });
  }

  getAlgorithmById(id: number): void {
    this.algorithmService.getAlgorithmById(id).subscribe(
      data => {
        this.selectedAlgorithm = data;
      }
    );
  }

  createImplementationParameter(type: string): void {
    const dialogRef = this.dialog.open(AddParameterDialogComponent, {
      width: '400px',
      data: {title: 'Add new ' + type + ' parameter'}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const parameter = Util.createParameterFromDialogResult(dialogResult);
        this.implementationService.addParameter(parameter, this.selectedAlgorithm.id, this.selectedImplementation.id, type)
          .subscribe(
            () => {
              this.handleParameterCreation();
            }
          );
      }
    });
  }

  getImplementationById(algoId: number, implId: number): void {
    this.implementationService.getImplementationById(algoId, implId).subscribe(
      implData => {
        this.selectedImplementation = implData;
      }
    );
  }

  private handleSelectedAlgorithmChanges(changes: SimpleChanges): void {
    if ('selectedAlgorithm' in changes) {
      this.selectedImplementation = null;
      this.selectedAlgorithm = changes.selectedAlgorithm.currentValue;
      this.getAlgorithmById(this.selectedAlgorithm.id);
    }
  }

  private handleSelectedImplementationChanges(changes: SimpleChanges): void {
    if ('selectedImplementation' in changes) {
      this.selectedImplementation = changes.selectedAlgorithm.currentValue;
      this.getImplementationById(this.selectedAlgorithm.id, this.selectedImplementation.id);
      this.selectedAlgorithm = null;
    }
  }

  private handleParameterCreation(): void {
    this.getImplementationById(this.selectedAlgorithm.id, this.selectedImplementation.id);
    this.snackbarService.callSnackBar('parameter');
  }

}

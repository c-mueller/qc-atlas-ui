import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Algorithm } from '../../model/algorithm.model';
import { Util } from '../../util/Util';
import { AddParameterDialogComponent } from '../algorithms/dialogs/add-parameter-dialog.component';
import { Parameter } from '../../model/parameter.model';
import { MatDialog } from '@angular/material/dialog';
import { AlgorithmService } from '../../services/algorithm.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit, OnChanges {

  @Input() selectedAlgorithm: Algorithm;
  displayedParametersColumns: string[] = ['name', 'type', 'description', 'restriction'];

  constructor(public dialog: MatDialog, private algorithmService: AlgorithmService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getAlgorithmById(this.selectedAlgorithm.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('selectedAlgorithm' in changes) {
      this.selectedAlgorithm = changes.selectedAlgorithm.currentValue;
      this.getAlgorithmById(this.selectedAlgorithm.id);
    }
  }

  createAlgorithmParameter(type: string): void {
    const dialogRef = this.dialog.open(AddParameterDialogComponent, {
      width: '400px',
      data: {title: 'Add new ' + type + ' parameter'}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const parameter: Parameter = Util.createParameterFromDialogResult(dialogResult);
        this.algorithmService.addParameter(parameter, this.selectedAlgorithm.id, type).subscribe(
          () => {
            this.getAlgorithmById(this.selectedAlgorithm.id);
            this.callSnackBar('parameter');
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

  private callSnackBar(addedEntity: string) {
    this.snackBar.open('Successfully added new ' + addedEntity, 'Ok', {
      duration: 2000,
    });
  }

}

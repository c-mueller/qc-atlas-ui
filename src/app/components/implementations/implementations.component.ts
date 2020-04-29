import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Implementation } from '../../model/implementation.model';
import { AddParameterDialogComponent } from '../algorithms/dialogs/add-parameter-dialog.component';
import { ImplementationService } from '../../services/implementation.service';
import { TagService } from '../../services/tag.service';
import { Tag } from '../../model/tag.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sdk } from '../../model/sdk.model';
import { Algorithm } from '../../model/algorithm.model';
import { Util } from '../../util/Util';

@Component({
  selector: 'app-implementations',
  templateUrl: './implementations.component.html',
  styleUrls: ['./implementations.component.scss']
})
export class ImplementationsComponent implements OnInit, OnChanges {

  displayedParametersColumns: string[] = ['name', 'type', 'description', 'restriction'];
  displayedTagsColumns: string[] = ['key', 'value'];

  @Input() selectedImplementation: Implementation;
  @Input() selectedAlgorithm: Algorithm;
  @Input() implementations: Implementation[];

  tags: Tag[] = [];
  sdks: Sdk[] = [];

  constructor(private implementationService: ImplementationService, private tagService: TagService, public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getImplementationById(this.selectedAlgorithm.id, this.selectedImplementation.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.handleSelectedImplementationChanges(changes);
    this.handleSelectedAlgorithmChanges(changes);
    this.handleImplementationsChanges(changes);

    this.getImplementationById(this.selectedAlgorithm.id, this.selectedImplementation.id);
  }

  getImplementationById(algoId: number, implId: number): void {
    this.implementationService.getImplementationById(algoId, implId).subscribe(
      implData => {
        this.selectedImplementation = implData;
        this.tagService.getTagsForImplementation(algoId, implId).subscribe(
          tagData => {
            this.tags = tagData.tagsDtos;
          }
        );
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

  private handleParameterCreation(): void {
    this.getImplementationById(this.selectedAlgorithm.id, this.selectedImplementation.id);
    this.callSnackBar();
  }

  private callSnackBar(): void {
    this.snackBar.open('Successfully added input parameter', 'Ok', {
      duration: 2000,
    });
  }

  private handleSelectedAlgorithmChanges(changes: SimpleChanges): void {
    if ('selectedAlgorithm' in changes) {
      this.selectedAlgorithm = changes.selectedAlgorithm.currentValue;
    }
  }

  private handleImplementationsChanges(changes: SimpleChanges): void {
    if ('implementations' in changes) {
      this.implementations = changes.implementations.currentValue;
    }
  }

  private handleSelectedImplementationChanges(changes: SimpleChanges): void {
    if ('selectedImplementation' in changes) {
      this.selectedImplementation = changes.selectedImplementation.currentValue;
    }
  }

}

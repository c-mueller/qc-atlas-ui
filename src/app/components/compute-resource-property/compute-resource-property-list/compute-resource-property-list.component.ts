import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityModelComputeResourcePropertyDto } from 'api/models/entity-model-compute-resource-property-dto';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';
import {
  EditComputeResourcePropertyDialogComponent,
  EditComputeResourcePropertyDialogData,
} from '../dialogs/edit-compute-resource-property-dialog.component';
import { UtilService } from '../../../util/util.service';

@Component({
  selector: 'app-compute-resource-property-list',
  templateUrl: './compute-resource-property-list.component.html',
  styleUrls: ['./compute-resource-property-list.component.scss'],
})
export class ComputeResourcePropertyListComponent implements OnInit {
  @Input()
  resourceProperties: EntityModelComputeResourcePropertyDto[] = [];

  @Output()
  addProperty: EventEmitter<
    EntityModelComputeResourcePropertyDto
  > = new EventEmitter<EntityModelComputeResourcePropertyDto>();
  @Output()
  deleteProperty: EventEmitter<
    EntityModelComputeResourcePropertyDto
  > = new EventEmitter<EntityModelComputeResourcePropertyDto>();
  @Output()
  updateProperty: EventEmitter<
    EntityModelComputeResourcePropertyDto
  > = new EventEmitter<EntityModelComputeResourcePropertyDto>();

  hoveredEntry = '';

  constructor(private utilService: UtilService) {}

  ngOnInit(): void {}

  onAdd(): void {
    this.showEditDialog(
      null,
      'Create Computing Resource Property',
      this.addProperty
    );
  }

  onDelete(element: EntityModelComputeResourcePropertyDto): void {
    const dialogData: ConfirmDialogData = {
      title: 'Confirm Delete',
      message: 'Do you really want to delete this compute resource property?',
      yesButtonText: 'Yes',
      noButtonText: 'No',
    };
    const dialogRef = this.utilService.createDialog(
      ConfirmDialogComponent,
      dialogData
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult != null) {
        this.deleteProperty.emit(element);
      }
    });
  }

  onEdit(element: EntityModelComputeResourcePropertyDto): void {
    this.showEditDialog(
      element,
      'Edit Computing Resource Property',
      this.updateProperty
    );
  }

  showEditDialog(
    element: EntityModelComputeResourcePropertyDto,
    dialogTitle: string,
    emmiter: EventEmitter<EntityModelComputeResourcePropertyDto>
  ): void {
    const dialogData: EditComputeResourcePropertyDialogData = {
      title: dialogTitle,
      entity: element,
    };
    const dialogRef = this.utilService.createDialog(
      EditComputeResourcePropertyDialogComponent,
      dialogData
    );

    dialogRef
      .afterClosed()
      .subscribe((dialogResult: EntityModelComputeResourcePropertyDto) => {
        if (dialogResult != null) {
          emmiter.emit(dialogResult);
        }
      });
  }

  onHover(id: string): void {
    this.hoveredEntry = id;
  }

  isHovered(id: string): boolean {
    return this.hoveredEntry === id;
  }

  clearHover(): void {
    this.hoveredEntry = '';
  }
}
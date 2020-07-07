import { Component, Input, OnInit } from '@angular/core';
import { AlgorithmService } from 'api/services/algorithm.service';
import { EntityModelAlgorithmDto } from 'api/models/entity-model-algorithm-dto';
import { EntityModelImplementationDto } from 'api/models/entity-model-implementation-dto';
import { MatDialog } from '@angular/material/dialog';
import { ImplementationDto } from 'api/models/implementation-dto';
import { Router } from '@angular/router';
import { AddAlgorithmDialogComponent } from '../dialogs/add-algorithm-dialog.component';

@Component({
  selector: 'app-algorithm-implementations-list',
  templateUrl: './algorithm-implementations-list.component.html',
  styleUrls: ['./algorithm-implementations-list.component.scss'],
})
export class AlgorithmImplementationsListComponent implements OnInit {
  @Input() algorithm: EntityModelAlgorithmDto;

  implementations: EntityModelImplementationDto[];
  variableNames: string[] = ['name', 'description', 'dependencies'];
  tableColumns: string[] = ['Name', 'Description', 'Dependencies'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private algorithmService: AlgorithmService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.algorithmService
      .getImplementations({ algoId: this.algorithm.id })
      .subscribe(
        (impls) => {
          if (impls._embedded) {
            this.implementations = impls._embedded.implementations;
          } else {
            this.implementations = [];
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onAddImplementation(): void {
    const params: any = {};
    const dialogRef = this.dialog.open(AddAlgorithmDialogComponent, {
      width: '400px',
      data: { title: 'Add new implementation for this algorithm' },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const implementationDto: any = {
          name: dialogResult.name,
        };

        params.body = implementationDto as ImplementationDto;
        params.algoId = this.algorithm.id;
        this.algorithmService.createImplementation(params).subscribe((data) => {
          this.router.navigate([
            'algorithms',
            this.algorithm.id,
            'implementations',
            data.id,
          ]);
        });
      }
    });
  }

  onDeleteImplementation(event): void {}

  onDatalistConfigChanged(event): void {}

  onPageChanged(event): void {}

  onImplementationClicked(implementation: EntityModelImplementationDto): void {
    this.router.navigate([
      'algorithms',
      this.algorithm.id,
      'implementations',
      implementation.id,
    ]);
  }
}

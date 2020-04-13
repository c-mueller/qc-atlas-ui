import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlgorithmService } from '../../../services/algorithm.service';
import { Algorithm } from '../../../model/algorithm.model';
import { ImplementationService } from '../../../services/implementation.service';
import { Implementation } from '../../../model/implementation.model';
import { MatDialog } from '@angular/material/dialog';
import { ImportDialogComponent } from '../../importer/import-dialog.component';

@Component({
  selector: 'app-algorithms',
  templateUrl: './algorithms.component.html',
  styleUrls: ['./algorithms.component.scss']
})
export class AlgorithmsComponent implements OnInit {

  activeIndex = 0;
  tabs = ['algorithms', 'providers', 'sdks', 'tags'];
  page = 0;
  size = 50;

  algorithms: Array<Algorithm> = [];
  implementations: Array<Implementation> = [];
  implementationOpened = false;

  selectedColor = 'primary';
  overviewPage = 'overview/';

  selectedAlgorithm: Algorithm;
  selectedImplementation: Implementation;

  displayedParametersColumns: string[] = ['name', 'type', 'description', 'restriction'];
  displayedTagsColumns: string[] = ['key', 'value'];
  displayedImplementationColumns: string[] = ['name', 'sdk'];


  constructor(private router: Router, private algorithmService: AlgorithmService,
              private implementationService: ImplementationService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.algorithmService.getAllAlgorithms(this.page, this.size).subscribe(
      data => {
        this.algorithms = data.algorithmDtos;
        // set initial selected algorithm
        if (this.algorithms.length > 0) {
          this.algorithmSelected(this.algorithms[0]);
        }
      }
    );
  }

  tabIndexChanged(index: any): void {
    this.activeIndex = index;
    this.router.navigate([this.overviewPage + this.tabs[this.activeIndex]]);
  }

  algorithmSelected(algorithm: Algorithm): void {
    this.implementationOpened = false;
    this.selectedAlgorithm = algorithm;
    this.getImplementations();
  }

  getImplementations(): void {
    this.implementationService.getImplementationsForId(this.selectedAlgorithm.id).subscribe(
      data => {
        this.implementations = data.implementationDtos;
      }
    );
  }

  openImplementation(implementation: Implementation): void {
    this.implementationOpened = true;
    this.selectedImplementation = implementation;
  }

  getAlgoColor(id: number): string {
    if (id === this.selectedAlgorithm.id) {
      return this.selectedColor;
    }
    return null;
  }

  getImplColor(id: number): string {
    if (!this.selectedImplementation) {
      return null;
    }
    if (id === this.selectedImplementation.id) {
      return this.selectedColor;
    }
    return null;
  }

  importJSON(): void {
    const dialogRef = this.dialog.open(ImportDialogComponent, {
      width: '250px',
      data: {title: 'Import new algorithm'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.algorithmService.createAlgorithm(result).subscribe(
          data => {
            this.algorithms.push(data);
          }
        );
      }
    });
  }

  addAlgo(): void {
  }
}

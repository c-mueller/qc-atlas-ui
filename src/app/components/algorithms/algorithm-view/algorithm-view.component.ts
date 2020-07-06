import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EntityModelAlgorithmDto } from 'api/models/entity-model-algorithm-dto';
import { AlgorithmService } from 'api/services/algorithm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddAlgorithmDialogComponent } from '../dialogs/add-algorithm-dialog.component';
import { BreadcrumbLink } from '../../generics/navigation-breadcrumb/navigation-breadcrumb.component';

@Component({
  selector: 'app-algorithm-view',
  templateUrl: './algorithm-view.component.html',
  styleUrls: ['./algorithm-view.component.scss'],
})
export class AlgorithmViewComponent implements OnInit, OnDestroy {
  tabOptions: string[] = [
    'General',
    'Implementations',
    'Related algorithms',
    'Publications',
    'Discussion',
  ];

  testTags: string[] = ['test tag', 'quantum', 'algorithm'];

  algorithm: EntityModelAlgorithmDto;

  links: BreadcrumbLink[] = [{ heading: '', subHeading: '' }];

  private routeSub: Subscription;

  constructor(
    private algorithmService: AlgorithmService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(({ algoId }) => {
      this.algorithmService.getAlgorithm({ algoId }).subscribe(
        (res: EntityModelAlgorithmDto) => {
          console.log(res);
          this.algorithm = res;
          this.defineMissingAlgorithmFields();
          this.links[0] = {
            heading: this.algorithm.name,
            subHeading: this.algorithm.computationModel + ' Algorithm',
          };
        },
        (error) => {
          console.log(error);
          this.createEmptyAlgorithm();
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  createEmptyAlgorithm(): void {
    this.algorithm = {
      name: 'test algorithm',
      computationModel: 'QUANTUM',
      quantumComputationModel: 'GATE_BASED',
      acronym: 'test acronym',
    };
    this.defineMissingAlgorithmFields();
    this.links[0] = {
      heading: this.algorithm.name,
      subHeading: this.algorithm.computationModel + ' Algorithm',
    };
  }

  defineMissingAlgorithmFields(): void {
    if (this.algorithm.acronym == null) {
      this.algorithm.acronym = '';
    }
    if (this.algorithm.intent == null) {
      this.algorithm.intent = '';
    }
    if (this.algorithm.problem == null) {
      this.algorithm.problem = '';
    }
    if (this.algorithm.inputFormat == null) {
      this.algorithm.inputFormat = '';
    }
    if (this.algorithm.algoParameter == null) {
      this.algorithm.algoParameter = '';
    }
    if (this.algorithm.outputFormat == null) {
      this.algorithm.outputFormat = '';
    }
    if (this.algorithm.solution == null) {
      this.algorithm.solution = '';
    }
    if (this.algorithm.assumptions == null) {
      this.algorithm.assumptions = '';
    }
    // if (this.algorithm.applicationAreas == null) {
    //   this.algorithm.applicationAreas = [];
    // }
    // if (this.algorithm.problemTypes == null) {
    //   this.algorithm.problemTypes = [];
    // }
    if (this.algorithm.computationModel === 'QUANTUM') {
      // TODO: Quantum specific variables
    }

    // sketch 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL'
  }

  addTag(): void {
    console.log('add tag');
    // TODO: create tag dialog
  }

  removeTag(tag: string): void {
    const index = this.testTags.indexOf(tag);
    if (index !== -1) {
      this.testTags.splice(index, 1);
    }
  }

  addApplicationArea(applicationArea: string): void {
    // this.algorithm.applicationAreas.push(applicationArea);
  }

  removeApplicationArea(applicationArea: string): void {
    // const index = this.algorithm.applicationAreas.indexOf(applicationArea);
    // if (index !== -1) {
    //   this.algorithm.applicationAreas.splice(index, 1);
    // }
  }

  testDialog() {
    const dialogRef = this.dialog.open(AddAlgorithmDialogComponent, {
      width: '400px',
      data: { title: 'Add new algorithm' },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      console.log(dialogResult);
    });
  }
}

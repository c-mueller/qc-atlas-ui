import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EntityModelAlgorithmDto } from 'api/models/entity-model-algorithm-dto';
import { AlgorithmService } from 'api/services/algorithm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddAlgorithmDialogComponent } from '../dialogs/add-algorithm-dialog.component';

@Component({
  selector: 'app-algorithm-view',
  templateUrl: './algorithm-view.component.html',
  styleUrls: ['./algorithm-view.component.scss'],
})
export class AlgorithmViewComponent implements OnInit {
  tabOptions: string[] = [
    'General',
    'Implementations',
    'Related algorithms',
    'Publications',
    'Discussion',
  ];

  testTags: string[] = ['test tag', 'quantum', 'algorithm'];

  algorithm: EntityModelAlgorithmDto;

  constructor(
    private algorithmService: AlgorithmService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createEmptyAlgorithm();
    this.getAlgorithmFromUrl();
  }

  getAlgorithmFromUrl(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.algorithmService.getAlgorithm({ algoId: id }).subscribe(
      (res: EntityModelAlgorithmDto) => {
        console.log(res);
        this.algorithm = res;
        this.defineMissingAlgorithmFields();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createEmptyAlgorithm(): void {
    this.algorithm = {
      name: 'test algorithm',
      computationModel: 'QUANTUM',
      acronym: 'test acronym',
    };
    this.defineMissingAlgorithmFields();
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
    if (this.algorithm.applicationAreas == null) {
      this.algorithm.applicationAreas = [];
    }
    if (this.algorithm.problemTypes == null) {
      this.algorithm.problemTypes = [];
    }
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
    this.algorithm.applicationAreas.push(applicationArea);
  }

  removeApplicationArea(applicationArea: string): void {
    const index = this.algorithm.applicationAreas.indexOf(applicationArea);
    if (index !== -1) {
      this.algorithm.applicationAreas.splice(index, 1);
    }
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

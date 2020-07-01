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
      },
      (error) => {
        console.log(error);
      }
    );
  }

  removeTag(tag: string): void {
    const index = this.testTags.indexOf(tag);
    if (index !== -1) {
      this.testTags.splice(index, 1);
    }
  }

  createEmptyAlgorithm(): void {
    this.algorithm = {
      name: 'test algorithm',
      computationModel: 'QUANTUM',
      acronym: 'test acronym',
    };
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

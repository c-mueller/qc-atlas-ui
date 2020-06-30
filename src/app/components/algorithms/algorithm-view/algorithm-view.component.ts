import { Component, OnInit } from '@angular/core';
import {AddAlgorithmDialogComponent} from "../dialogs/add-algorithm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-algorithm-view',
  templateUrl: './algorithm-view.component.html',
  styleUrls: ['./algorithm-view.component.scss'],
})
export class AlgorithmViewComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  testDialog() {
     const dialogRef = this.dialog.open(AddAlgorithmDialogComponent, {
      width: '400px',
      data: { title: 'Add new algorithm'},
    });

     dialogRef.afterClosed().subscribe((dialogResult) => {
       console.log(dialogResult);
     })
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagService } from '../../../services/tag.service';
import { Tag } from '../../../model/tag.model';
import { ImportDialogComponent } from '../../importer/import-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  activeIndex = 3;
  tabs = ['algorithms', 'providers', 'sdks', 'tags'];

  tags: Array<Tag> = [];

  displayedTagsColumns: string[] = ['key', 'value'];

  constructor(private router: Router, private tagService: TagService,
              public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getAllTags();
  }

  tabIndexChanged(index: any): void {
    this.activeIndex = index;
    this.router.navigate(['overview/' + this.tabs[this.activeIndex]]);
  }

  getAllTags(): void {
    this.tagService.getAllTags().subscribe(
      data => {
        console.log(data);
        this.tags = data.tagsDtos;
      }
    );
  }

  importJSON(): void {
    const dialogRef = this.dialog.open(ImportDialogComponent, {
      width: '250px',
      data: {title: 'Import new tags'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tagService.createTag(result).subscribe(
          data => {
            this.getAllTags();
            this.snackBar.open('Successfully added new tag', 'Ok', {
              duration: 2000,
            });
          }
        );
      }
    });
  }

  addTag(): void {
  }

}

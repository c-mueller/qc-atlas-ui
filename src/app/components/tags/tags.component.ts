import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagService } from '../../services/tag.service';
import { Tag } from '../../model/tag.model';
import { JsonImportDialogComponent } from '../json-import-dialog/json-import-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddTagDialogComponent } from './dialogs/add-tag-dialog.component';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags: Array<Tag> = [];

  displayedTagsColumns: string[] = ['key', 'value'];

  constructor(private router: Router, private tagService: TagService,
              public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getAllTags();
  }

  getAllTags(): void {
    this.tagService.getAllTags().subscribe(
      data => {
        this.tags = data.tagsDtos;
      }
    );
  }

  importJSON(): void {
    const dialogRef = this.dialog.open(JsonImportDialogComponent, {
      width: '250px',
      data: {title: 'Import new tags'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tagService.createTag(result).subscribe(
          data => {
            this.tags.push(data);
            this.snackBar.open('Successfully added new tag', 'Ok', {
              duration: 2000,
            });
          }
        );
      }
    });
  }

  addTag(): void {
    const dialogRef = this.dialog.open(AddTagDialogComponent, {
      width: '400px',
      data: {title: 'Add new Tag'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const tag: Tag = {
          key: result.key,
          value: result.value
        };
        this.tagService.addTag(tag).subscribe(
          () => {
            this.getAllTags();
            this.snackBar.open('Successfully added new tag', 'Ok', {
              duration: 2000,
            });
          }
        );
      }
    });
  }

}

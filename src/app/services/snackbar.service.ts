import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {
  }

  public callSnackBar(addedEntity: string): void {
    this.snackBar.open('Successfully added new ' + addedEntity, 'Ok', {
      duration: 2000,
    });
  }
}

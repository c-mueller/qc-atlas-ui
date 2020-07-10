import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
import { GenericDataService } from '../../util/generic-data.service';
import { TextInputComponent } from './property-input/text-input.component';
import { SelectInputComponent } from './property-input/select-input.component';
import { CheckboxInputComponent } from './property-input/checkbox-input.component';
import { DataListComponent } from './data-list/data-list.component';
import { ChipCollectionComponent } from './chip-collection/chip-collection.component';

@NgModule({
  declarations: [
    TextInputComponent,
    SelectInputComponent,
    CheckboxInputComponent,
    DataListComponent,
    ChipCollectionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MDBBootstrapModule,
    MatInputModule,
    MatTabsModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  exports: [
    TextInputComponent,
    SelectInputComponent,
    CheckboxInputComponent,
    DataListComponent,
    ChipCollectionComponent,
    RouterModule,
    MatSortModule,
  ],
  providers: [GenericDataService],
})
export class GenericsModule {}

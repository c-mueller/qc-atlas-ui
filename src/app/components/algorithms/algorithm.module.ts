import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NavigationBreadcrumbModule } from '../generics/navigation-breadcrumb/navigation-breadcrumb.module';
import { GenericsModule } from '../generics/generics.module';
import { AlgorithmListComponent } from './algorithm-list/algorithm-list.component';
import { AlgorithmViewComponent } from './algorithm-view/algorithm-view.component';
import { AlgorithmImplementationsListComponent } from './algorithm-implementations-list/algorithm-implementations-list.component';
import { AlgorithmRelatedAlgosListComponent } from './algorithm-related-algos-list/algorithm-related-algos-list.component';
import { AlgorithmPropertiesComponent } from './algorithm-properties/algorithm-properties.component';
import { AlgorithmPublicationsListComponent } from './algorithm-publications-list/algorithm-publications-list.component';
import { AddAlgorithmDialogComponent } from './dialogs/add-algorithm-dialog.component';
import { AddProblemTypeDialogComponent } from './dialogs/add-problem-type-dialog.component';

@NgModule({
  declarations: [
    AlgorithmListComponent,
    AlgorithmViewComponent,
    AlgorithmPropertiesComponent,
    AlgorithmImplementationsListComponent,
    AlgorithmRelatedAlgosListComponent,
    AlgorithmPublicationsListComponent,
    AddAlgorithmDialogComponent,
    AddProblemTypeDialogComponent,
  ],
  imports: [
    MatTabsModule,
    MatChipsModule,
    NavigationBreadcrumbModule,
    MatIconModule,
    MatCardModule,
    GenericsModule,
    MatFormFieldModule,
    MatListModule,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatAutocompleteModule,
  ],
  exports: [
    AlgorithmListComponent,
    AlgorithmViewComponent,
    AlgorithmPropertiesComponent,
    AlgorithmImplementationsListComponent,
    AlgorithmRelatedAlgosListComponent,
    AlgorithmPublicationsListComponent,
    AddAlgorithmDialogComponent,
    AddProblemTypeDialogComponent,
  ],
})
export class AlgorithmModule {}

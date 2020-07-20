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
import { MatTreeModule } from '@angular/material/tree';
import { NavigationBreadcrumbModule } from '../generics/navigation-breadcrumb/navigation-breadcrumb.module';
import { GenericsModule } from '../generics/generics.module';
import { ComputingResourcePropertyModule } from '../computation-resource-property/computing-resource-property.module';
import { AlgorithmListComponent } from './algorithm-list/algorithm-list.component';
import { AlgorithmViewComponent } from './algorithm-view/algorithm-view.component';
import { AlgorithmImplementationsListComponent } from './algorithm-implementations-list/algorithm-implementations-list.component';
import { AlgorithmRelatedAlgosListComponent } from './algorithm-related-algos-list/algorithm-related-algos-list.component';
import { AlgorithmPropertiesComponent } from './algorithm-properties/algorithm-properties.component';
import { AlgorithmPublicationsListComponent } from './algorithm-publications-list/algorithm-publications-list.component';
import { AddAlgorithmDialogComponent } from './dialogs/add-algorithm-dialog.component';
import { AddProblemTypeDialogComponent } from './dialogs/add-problem-type-dialog.component';
import { RemoveProblemTypeDialogComponent } from './dialogs/remove-problem-type-dialog.component';
import { CreateImplementationDialogComponent } from './dialogs/create-implementation-dialog.component';
import { ProblemTypeTreeComponent } from './problem-type-tree/problem-type-tree.component';

@NgModule({
  declarations: [
    AlgorithmListComponent,
    AlgorithmViewComponent,
    AlgorithmPropertiesComponent,
    AlgorithmImplementationsListComponent,
    AlgorithmRelatedAlgosListComponent,
    AlgorithmPublicationsListComponent,
    ProblemTypeTreeComponent,
    AddAlgorithmDialogComponent,
    AddProblemTypeDialogComponent,
    RemoveProblemTypeDialogComponent,
    CreateImplementationDialogComponent,
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
    MatTreeModule,
    ComputingResourcePropertyModule,
  ],
  exports: [
    AlgorithmListComponent,
    AlgorithmViewComponent,
    AlgorithmPropertiesComponent,
    AlgorithmImplementationsListComponent,
    AlgorithmRelatedAlgosListComponent,
    AlgorithmPublicationsListComponent,
    ProblemTypeTreeComponent,
    AddAlgorithmDialogComponent,
    AddProblemTypeDialogComponent,
    RemoveProblemTypeDialogComponent,
    CreateImplementationDialogComponent,
  ],
})
export class AlgorithmModule {}
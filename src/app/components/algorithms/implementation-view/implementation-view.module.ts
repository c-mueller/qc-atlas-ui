import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {
  BadgeModule,
  BreadcrumbModule,
  CardsModule,
  IconsModule,
} from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ComputingResourcePropertyModule } from '../../computation-resource-property/computing-resource-property.module';
import { NavigationBreadcrumbModule } from '../../generics/navigation-breadcrumb/navigation-breadcrumb.module';
import { GenericsModule } from '../../generics/generics.module';
import { ImplSelectionCriteriaComponent } from '../impl-selection-criteria/impl-selection-criteria.component';
import { ImplementationViewComponent } from './implementation-view.component';
import { ImplementationPublicationsListComponent } from './implementation-publications-list/implementation-publications-list.component';

@NgModule({
  declarations: [
    ImplementationViewComponent,
    ImplementationPublicationsListComponent,
    ImplSelectionCriteriaComponent,
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    BadgeModule,
    IconsModule,
    MatChipsModule,
    MatTabsModule,
    MatIconModule,
    CommonModule,
    NavigationBreadcrumbModule,
    GenericsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    ComputingResourcePropertyModule,
    MatCardModule,
    CardsModule,
    MatCheckboxModule,
  ],
})
export class ImplementationViewModule {}

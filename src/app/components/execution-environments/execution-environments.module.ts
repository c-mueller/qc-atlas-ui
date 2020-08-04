import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { GenericsModule } from '../generics/generics.module';
import { ExecutionEnvironmentsListComponent } from './execution-environments-list/execution-environments-list.component';
import { ComputeResourceViewComponent } from './compute-resource/compute-resource-view/compute-resource-view.component';
import { ComputeResourceListComponent } from './compute-resource/compute-resource-list/compute-resource-list.component';
import { ExecutionEnvironmentSearchComponent } from './execution-environment-search/execution-environment-search.component';
import { SoftwarePlatformsModule } from './software-platforms/software-platforms.module';
import { CloudServicesModule } from './cloud-services/cloud-services-module';

@NgModule({
  declarations: [
    ExecutionEnvironmentsListComponent,
    ComputeResourceViewComponent,
    ComputeResourceListComponent,
    ExecutionEnvironmentSearchComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    GenericsModule,
    MatCardModule,
    SoftwarePlatformsModule,
    CloudServicesModule,
  ],
  exports: [
    ExecutionEnvironmentsListComponent,
    ExecutionEnvironmentSearchComponent,
  ],
})
export class ExecutionEnvironmentsModule {}

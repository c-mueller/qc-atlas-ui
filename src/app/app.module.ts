import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlgorithmsComponent } from './components/algorithms/algorithms.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { SdksComponent } from './components/sdks/sdks.component';
import { TagsComponent } from './components/tags/tags.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddImplementationDialogComponent } from './components/algorithms/dialogs/add-implementation-dialog.component';
import { AddQpuDialogComponent } from './components/providers/dialogs/add-qpu-dialog.component';
import { AddParameterDialogComponent } from './components/algorithms/dialogs/add-parameter-dialog.component';
import { AddSdkDialogComponent } from './components/sdks/dialogs/add-sdk-dialog.component';
import { AddTagDialogComponent } from './components/tags/dialogs/add-tag-dialog.component';
import { AddAlgorithmDialogComponent } from './components/algorithms/dialogs/add-algorithm-dialog.component';
import { AddProviderDialogComponent } from './components/providers/dialogs/add-provider-dialog.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { JsonImportDialogComponent } from './components/json-import-dialog/json-import-dialog.component';

@NgModule({
  declarations: [
    // components
    AppComponent,
    AlgorithmsComponent,
    ProvidersComponent,
    SdksComponent,
    TagsComponent,
    PageNotFoundComponent,
    // dialogs
    AddParameterDialogComponent,
    AddSdkDialogComponent,
    AddTagDialogComponent,
    AddAlgorithmDialogComponent,
    AddProviderDialogComponent,
    AddImplementationDialogComponent,
    AddQpuDialogComponent,
    JsonImportDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // material modules
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
  ],
  entryComponents: [
    // dialogs need to be provided as entry component
    AddParameterDialogComponent,
    AddSdkDialogComponent,
    AddTagDialogComponent,
    AddAlgorithmDialogComponent,
    AddProviderDialogComponent,
    AddImplementationDialogComponent,
    AddQpuDialogComponent,
    JsonImportDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

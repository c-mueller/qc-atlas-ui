import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './components/overview/overview/overview.component';
import { AlgorithmsComponent } from './components/overview/algorithms/algorithms.component';
import { ProvidersComponent } from './components/overview/providers/providers.component';
import { SdksComponent } from './components/overview/sdks/sdks.component';
import { TagsComponent } from './components/overview/tags/tags.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ImportDialogComponent } from './components/importer/import-dialog.component';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NisqAnalyzerComponent } from './components/nisq-analyzer/nisq-analyzer/nisq-analyzer.component';
import { ProvenanceComponent } from './components/provenance/provenance/provenance.component';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddParameterDialogComponent } from './components/overview/algorithms/dialogs/add-parameter-dialog.component';
import { AddSdkDialogComponent } from './components/overview/sdks/dialogs/add-sdk-dialog.component';
import { AddTagDialogComponent } from './components/overview/tags/dialogs/add-tag-dialog.component';
import { AddAlgorithmDialogComponent } from './components/overview/algorithms/dialogs/add-algorithm-dialog.component';
import { AddProviderDialogComponent } from './components/overview/providers/dialogs/add-provider-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    AlgorithmsComponent,
    ProvidersComponent,
    SdksComponent,
    TagsComponent,
    PageNotFoundComponent,
    NisqAnalyzerComponent,
    ImportDialogComponent,
    ProvenanceComponent,
    AddParameterDialogComponent,
    AddSdkDialogComponent,
    AddTagDialogComponent,
    AddAlgorithmDialogComponent,
    AddProviderDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    HttpClientModule,
    MatButtonModule,
  ],
  entryComponents: [
    ImportDialogComponent,
    AddParameterDialogComponent,
    AddSdkDialogComponent,
    AddTagDialogComponent,
    AddAlgorithmDialogComponent,
    AddProviderDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

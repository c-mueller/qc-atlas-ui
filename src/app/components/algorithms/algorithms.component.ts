import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlgorithmService } from '../../services/algorithm.service';
import { Algorithm } from '../../model/algorithm.model';
import { ImplementationService } from '../../services/implementation.service';
import { Implementation } from '../../model/implementation.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddParameterDialogComponent } from './dialogs/add-parameter-dialog.component';
import { Parameter } from '../../model/parameter.model';
import { AddAlgorithmDialogComponent } from './dialogs/add-algorithm-dialog.component';
import { TagService } from '../../services/tag.service';
import { Tag } from '../../model/tag.model';
import { Content } from '../../model/content.model';
import { AddImplementationDialogComponent } from './dialogs/add-implementation-dialog.component';
import { Sdk } from '../../model/sdk.model';
import { SdkService } from '../../services/sdk.service';
import { JsonImportDialogComponent } from '../json-import-dialog/json-import-dialog.component';
import { MissingEntityDialogComponent } from '../json-import-dialog/missing-entity-dialog.component';

@Component({
  selector: 'app-algorithms',
  templateUrl: './algorithms.component.html',
  styleUrls: ['./algorithms.component.scss']
})
export class AlgorithmsComponent implements OnInit {

  algorithms: Algorithm[] = [];

  tags: Tag[] = [];
  sdks: Sdk[] = [];

  implementations: Implementation[] = [];
  implementationOpened = false;

  isSelectedColor = 'primary';

  selectedAlgorithm: Algorithm;
  selectedImplementation: Implementation;

  displayedParametersColumns: string[] = ['name', 'type', 'description', 'restriction'];
  displayedTagsColumns: string[] = ['key', 'value'];
  displayedImplementationColumns: string[] = ['name', 'sdk'];


  constructor(private router: Router, private algorithmService: AlgorithmService,
              private implementationService: ImplementationService, public dialog: MatDialog,
              private snackBar: MatSnackBar, private tagService: TagService, private sdkService: SdkService) {
  }

  ngOnInit(): void {
    this.getAllAlgorithms();
    this.getTags();
    this.getSdks();
  }

  getSdks(): void {
    this.sdkService.getAllSdks().subscribe(
      data => {
        this.sdks = data.sdkDtos;
      }
    );
  }

  getAllAlgorithms(): void {
    this.algorithmService.getAllAlgorithms().subscribe(
      data => {
        this.algorithms = data.algorithmDtos;
        // set initial selected algorithm
        if (this.algorithms.length > 0) {
          this.onAlgorithmSelected(this.algorithms[0]);
        }
      }
    );
  }

  getAlgorithmById(id: number): void {
    this.algorithmService.getAlgorithmById(id).subscribe(
      data => {
        this.selectedAlgorithm = data;
      }
    );
  }

  getImplementationById(algoId: number, implId: number): void {
    this.implementationService.getImplementationById(algoId, implId).subscribe(
      data => {
        this.selectedImplementation = data;
        this.tagService.getTagsForImplementation(algoId, implId).subscribe(
          tagData => {
            this.tags = tagData.tagsDtos;
          }
        );
      }
    );
  }

  createImplementationParameter(type: string): void {
    const dialogRef = this.dialog.open(AddParameterDialogComponent, {
      width: '400px',
      data: {title: 'Add new ' + type + ' parameter'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const parameter: Parameter = {
          name: result.name,
          description: result.description,
          type: result.type,
          restriction: result.restriction
        };
        this.implementationService.addParameter(parameter, this.selectedAlgorithm.id, this.selectedImplementation.id, type)
          .subscribe(
            () => {
              this.getImplementationById(this.selectedAlgorithm.id, this.selectedImplementation.id);
              this.snackBar.open('Successfully added input parameter', 'Ok', {
                duration: 2000,
              });
            }
          );
      }
    });
  }

  createAlgorithmParameter(type: string): void {
    const dialogRef = this.dialog.open(AddParameterDialogComponent, {
      width: '400px',
      data: {title: 'Add new ' + type + ' parameter'}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const parameter: Parameter = this.createParameterFromDialogResult(dialogResult);
        this.algorithmService.addParameter(parameter, this.selectedAlgorithm.id, type).subscribe(
          () => {
            this.getAlgorithmById(this.selectedAlgorithm.id);
            this.snackBar.open('Successfully added input parameter', 'Ok', {
              duration: 2000,
            });
          });
      }
    });
  }

  onAlgorithmSelected(algorithm: Algorithm): void {
    this.implementationOpened = false;
    this.selectedAlgorithm = algorithm;
    this.getImplementations();
    this.getTagsForAlgorithm();
  }

  getImplementations(): void {
    this.implementationService.getImplementationsForAlgorithm(this.selectedAlgorithm.id).subscribe(
      implementations => {
        this.implementations = implementations.implementationDtos;
      }
    );
  }

  openImplementation(implementation: Implementation): void {
    this.implementationOpened = true;
    this.selectedImplementation = implementation;
  }

  getColorOfAlgorithmButton(id: number): string {
    if (!this.selectedAlgorithm) {
      return null;
    }
    if (id === this.selectedAlgorithm.id) {
      return this.isSelectedColor;
    }
  }

  getColorOfImplementationButton(id: number): string {
    if (!this.selectedImplementation) {
      return null;
    }
    if (id === this.selectedImplementation.id) {
      return this.isSelectedColor;
    }
    return null;
  }

  createAlgorithmWithJson(): void {
    if (this.tags.length === 0) {
      this.createMissingEntityDialog();
      return;
    }
    const dialogRef = this.dialog.open(JsonImportDialogComponent, {
      width: '250px',
      data: {title: 'Import new algorithm'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.algorithmService.createAlgorithmWithJson(result).subscribe(
          algorithmResult => {
            this.processAlgorithmResult(algorithmResult);
          }
        );
      }
    });
  }

  deleteAlgorithm(): void {
    this.algorithmService.deleteAlgorithm(this.selectedAlgorithm.id).subscribe(
      () => {
        this.getAllAlgorithms();
        this.snackBar.open('Successfully deleted algorithm.', 'Ok', {
          duration: 2000,
        });
      }
    );
  }

  createImplementationWithJson(): void {
    const dialogRef = this.dialog.open(JsonImportDialogComponent, {
      width: '250px',
      data: {title: 'Import new implementation'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.implementationService.createImplementationWithJson(this.selectedAlgorithm.id, result).subscribe(
          implementationResult => {
            this.processImplementationResult(implementationResult);
          }
        );
      }
    });
  }

  getTags(): void {
    this.tagService.getAllTags().subscribe(
      data => {
        this.tags = data.tagsDtos;
      }
    );
  }

  createAlgorithm(): void {
    if (this.tags.length === 0) {
      this.createMissingEntityDialog();
      return;
    }
    const dialogRef = this.dialog.open(AddAlgorithmDialogComponent, {
      width: '600px',
      data: {title: 'Add new algorithm', tags: this.tags}
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.selectedAlgorithm = null;
        this.implementations = null;
        const resultContent: Content = this.createContentFromDialogResult(dialogResult);
        const algorithm: Algorithm = this.createAlgorithmFromDialogResult(dialogResult, resultContent);
        this.algorithmService.createAlgorithm(algorithm).subscribe(
          algorithmResult => {
            this.processAlgorithmResult(algorithmResult);
          }
        );
      }
    });
  }

  createImplementation(): void {
    const dialogRef = this.dialog.open(AddImplementationDialogComponent, {
      width: '600px',
      data: {title: 'Add new implementation', tags: this.tags, sdks: this.sdks}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.selectedImplementation = null;
        const resultContent: Content = this.createContentFromDialogResult(dialogResult);
        const implementation: Implementation = this.createImplementationFromDialogResult(dialogResult, resultContent);
        this.implementationService.createImplementation(this.selectedAlgorithm.id, implementation).subscribe(
          implementationResult => {
            this.processImplementationResult(implementationResult);
          }
        );
      }
    });
  }

  private getTagsForAlgorithm(): void {
    this.tagService.getTagsForAlgorithm(this.selectedAlgorithm.id).subscribe(
      tagData => {
        this.tags = tagData.tagsDtos;
      }
    );
  }

  private createMissingEntityDialog(): void {
    const missingDialog = this.dialog.open(MissingEntityDialogComponent, {
      width: '600px',
      data: {missingEntity: 'tags', currentEntity: 'algorithms'}
    });
  }

  private createParameterFromDialogResult(dialogResult: any): Parameter {
    return {
      name: dialogResult.name,
      description: dialogResult.description,
      type: dialogResult.type,
      restriction: dialogResult.restriction
    };
  }

  private processAlgorithmResult(algorithmResult: Algorithm): void {
    this.algorithms.push(algorithmResult);
    this.onAlgorithmSelected(algorithmResult);
    this.snackBar.open('Successfully added new algorithm', 'Ok', {
      duration: 2000,
    });
  }

  private processImplementationResult(implementationResult: Implementation): void {
    this.implementations.push(implementationResult);
    this.selectedImplementation = implementationResult;
    this.implementationOpened = true;
    this.snackBar.open('Successfully added new implementation', 'Ok', {
      duration: 2000,
    });
  }

  private createAlgorithmFromDialogResult(dialogResult: any, resultContent: Content): Algorithm {
    return {
      name: dialogResult.name,
      inputParameters: dialogResult.inputParameters,
      content: resultContent,
      outputParameters: dialogResult.outputParameters,
      tags: [dialogResult.tag]
    };
  }

  private createImplementationFromDialogResult(dialogResult: any, resultContent: Content): Implementation {
    return {
      name: dialogResult.name,
      sdk: dialogResult.sdk.name,
      content: resultContent,
      fileLocation: dialogResult.fileLocation,
      programmingLanguage: dialogResult.programmingLanguage,
      selectionRule: dialogResult.selectionRule,
      inputParameters: dialogResult.inputParameters,
      outputParameters: dialogResult.outputParameters,
      tags: [dialogResult.tag]
    };
  }

  private createContentFromDialogResult(dialogResult: any): Content {
    return {
      description: dialogResult.description
    };
  }
}

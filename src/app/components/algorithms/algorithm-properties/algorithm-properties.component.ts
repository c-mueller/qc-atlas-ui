import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityModelAlgorithmDto } from 'api/models/entity-model-algorithm-dto';
import { AlgorithmService } from 'api/services/algorithm.service';

@Component({
  selector: 'app-algorithm-properties',
  templateUrl: './algorithm-properties.component.html',
  styleUrls: ['./algorithm-properties.component.scss'],
})
export class AlgorithmPropertiesComponent implements OnInit {
  @Output() addApplicationArea: EventEmitter<string> = new EventEmitter<
    string
  >();
  @Output() removeApplicationArea: EventEmitter<string> = new EventEmitter<
    string
  >();
  @Input() algorithm: EntityModelAlgorithmDto;

  sketchOptions: string[] = ['PSEUDOCODE', 'CIRCUIT', 'ISING_MODEL'];

  constructor(private algorithmService: AlgorithmService) {}

  ngOnInit(): void {
    if (this.algorithm.acronym == null) {
      this.algorithm.acronym = '';
    }
  }

  onChangesSaved(value): void {
    console.log(value);
  }

  addApplicationAreaEvent(applicationArea: string): void {
    this.addApplicationArea.emit(applicationArea);
  }

  removeApplicationAreaEvent(applicationArea: string): void {
    this.removeApplicationArea.emit(applicationArea);
  }
}

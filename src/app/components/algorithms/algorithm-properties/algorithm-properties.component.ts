import {Component, Input, OnInit} from '@angular/core';
import {EntityModelAlgorithmDto} from "api/models/entity-model-algorithm-dto";
import {AlgorithmService} from "api/services/algorithm.service";

@Component({
  selector: 'app-algorithm-properties',
  templateUrl: './algorithm-properties.component.html',
  styleUrls: ['./algorithm-properties.component.scss']
})
export class AlgorithmPropertiesComponent implements OnInit {
  @Input() algorithm: EntityModelAlgorithmDto;

  constructor(private algorithmService: AlgorithmService) { }

  ngOnInit(): void { }

  onChangesSaved(value): void {
    console.log(value);
  }
}

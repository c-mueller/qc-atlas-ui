import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CloudServiceDto } from 'api/models/cloud-service-dto';

@Component({
  selector: 'app-cloud-service-properties',
  templateUrl: './cloud-service-properties.component.html',
  styleUrls: ['./cloud-service-properties.component.scss'],
})
export class CloudServicePropertiesComponent implements OnInit {
  @Input()
  public cloudService: CloudServiceDto;
  @Output() updateCloudServiceField: EventEmitter<{
    field;
    value;
  }> = new EventEmitter<{ field; value }>();

  constructor() {}

  ngOnInit(): void {}

  onChangesSaved(value: any, field: string): void {
    this.updateCloudServiceField.emit({ field, value });
  }
}

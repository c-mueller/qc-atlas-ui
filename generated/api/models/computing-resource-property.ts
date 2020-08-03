/* tslint:disable */
import { Algorithm } from './algorithm';
import { ComputeResource } from './compute-resource';
import { ComputingResourcePropertyType } from './computing-resource-property-type';
import { Implementation } from './implementation';
export type ComputingResourceProperty = {
  id?: string;
  computingResourcePropertyType?: ComputingResourcePropertyType;
  algorithm?: Algorithm;
  implementation?: Implementation;
  computeResource?: ComputeResource;
  value?: string;
};

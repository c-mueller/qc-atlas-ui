import { Tag } from './tag.model';
import { Parameters } from './parameters.model';
import { Content } from './content.model';

export class Implementation {
  id?: number;
  name: string;
  content?: Content;
  sdk: string;
  fileLocation: string;
  inputParameters?: Parameters;
  outputParameters?: Parameters;
  programmingLanguage: string;
  selectionRule: string;
  tags: Tag[];
}

export class ImplementationDtos {
  implementationDtos: Implementation[];
}

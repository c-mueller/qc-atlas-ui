// eslint-disable-next-line max-classes-per-file
import { Link } from './link.model';

export class Provider {
  id?: number;
  name: string;
  accessKey: string;
  secretKey: string;
  _links?: Link[];
}

export class ProviderDtoList {
  providerDtoList: Provider[];
}

export class Provider {
  id?: number;
  name: string;
  accessKey: string;
  secretKey: string;
}

export class ProviderDtoList {
  providerDtoList: Provider[];
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Provider } from '../model/provider.model';
import { Qpu } from '../model/qpu.model';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {


  constructor(private httpClient: HttpClient) {
  }

  getAllProviders(): Observable<any> {
    return this.httpClient.get(environment.API_URL + environment.PROVIDER_ENDPOINT);
  }

  addProvider(provider: Provider): Observable<any> {
    return this.httpClient.post(environment.API_URL + environment.PROVIDER_ENDPOINT, provider);
  }

  createProvider(jsonString: string): Observable<any> {
    return this.httpClient.post(environment.API_URL + environment.PROVIDER_ENDPOINT, JSON.parse(jsonString));
  }

  getQPUforProvider(providerId: number): Observable<any> {
    return this.httpClient.get(environment.API_URL + environment.PROVIDER_ENDPOINT + providerId
      + environment.QPU_ENDPOINT);
  }

  createQPU(providerId: number, jsonString: string): Observable<any> {
    return this.httpClient.post(environment.API_URL + environment.PROVIDER_ENDPOINT + providerId
      + environment.QPU_ENDPOINT, JSON.parse(jsonString));
  }

  addQPU(providerId: number, qpu: Qpu): Observable<any> {
    return this.httpClient.post(environment.API_URL + environment.PROVIDER_ENDPOINT + providerId
    + environment.QPU_ENDPOINT, qpu);
  }
}

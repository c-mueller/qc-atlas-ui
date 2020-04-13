import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {


  constructor(private httpClient: HttpClient) {
  }

  getAllProviders(): Observable<any> {
    return this.httpClient.get(environment.API_URL + environment.PROVIDER_ENDPOINT);
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
}

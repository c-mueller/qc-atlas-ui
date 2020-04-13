import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  providerEndpoint = '/providers/';
  qpuEndpoint = '/qpus/';

  constructor(private httpClient: HttpClient) {
  }

  getAllProviders(): Observable<any> {
    return this.httpClient.get(environment.API_URL + this.providerEndpoint);
  }

  createProvider(): Observable<any> {
    return this.httpClient.post(environment.API_URL + this.providerEndpoint, {
      name: 'IBM',
      accessKey: '1234567',
      secretKey: 'pass'
    });
  }

  getQPUforProvider(providerId: number): Observable<any> {
    return this.httpClient.get(environment.API_URL + this.providerEndpoint + providerId + this.qpuEndpoint);
  }

  createQPU(providerId: number): Observable<any> {
    return this.httpClient.post(environment.API_URL + this.providerEndpoint + providerId + this.qpuEndpoint, {
      name: 'ibmq_16_melbourne',
      numberOfQubits: 15,
      t1: 50063.8361,
      maxGateTime: 1043,
      supportedSdkIds: [59]
    });
  }
}

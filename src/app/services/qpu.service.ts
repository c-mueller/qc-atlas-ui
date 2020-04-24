import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Qpu } from '../model/qpu.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class QpuService {

  constructor(private httpClient: HttpClient) {
  }

  getQpuforProvider(providerId: number): Observable<any> {
    return this.httpClient.get(environment.API_URL + environment.PROVIDER_ENDPOINT + providerId
      + environment.QPU_ENDPOINT);
  }

  createQpuWithJson(providerId: number, jsonString: string): Observable<any> {
    return this.httpClient.post(environment.API_URL + environment.PROVIDER_ENDPOINT + providerId
      + environment.QPU_ENDPOINT, JSON.parse(jsonString));
  }

  createQpu(providerId: number, qpu: Qpu): Observable<any> {
    return this.httpClient.post(environment.API_URL + environment.PROVIDER_ENDPOINT + providerId
      + environment.QPU_ENDPOINT, qpu);
  }
}

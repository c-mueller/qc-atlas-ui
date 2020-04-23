import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Sdk } from '../model/sdk.model';

@Injectable({
  providedIn: 'root'
})
export class SdkService {


  constructor(private httpClient: HttpClient) {
  }

  createSdk(jsonString: string): Observable<any> {
    return this.httpClient.post(environment.API_URL + environment.SDK_ENDPOINT, JSON.parse(jsonString));
  }

  addSdk(sdk: Sdk): Observable<any> {
    return this.httpClient.post(environment.API_URL + environment.SDK_ENDPOINT, sdk);
  }

  getAllSdks(): Observable<any> {
    return this.httpClient.get(environment.API_URL + environment.SDK_ENDPOINT);
  }
}

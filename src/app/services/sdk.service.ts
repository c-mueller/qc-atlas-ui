import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SdkService {

  sdkEndpoint = '/sdks/';

  constructor(private httpClient: HttpClient) {
  }

  createSdk(jsonString: string): Observable<any> {
    return this.httpClient.post(environment.API_URL + this.sdkEndpoint, JSON.parse(jsonString));
  }

  getAllSdks(): Observable<any> {
    return this.httpClient.get(environment.API_URL + this.sdkEndpoint);
  }
}

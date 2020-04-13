import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  tagEndpoint = '/tags/';

  constructor(private httpClient: HttpClient) {
  }

  createTag(): Observable<any> {
    return this.httpClient.post(environment.API_URL + this.tagEndpoint, {
      key: 'Algorithm class',
      value: 'Factorization'
    });
  }
}

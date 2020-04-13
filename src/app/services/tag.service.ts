import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private httpClient: HttpClient) {
  }

  getAllTags(): Observable<any> {
    return this.httpClient.get(environment.API_URL + environment.TAG_ENDPOINT);
  }

  createTag(jsonString: string): Observable<any> {
    return this.httpClient.post(environment.API_URL + environment.TAG_ENDPOINT, JSON.parse(jsonString));
  }
}

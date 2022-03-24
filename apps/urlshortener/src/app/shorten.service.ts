import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Message } from '@evolving/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class ShortenService {
  constructor(private httpClient: HttpClient) {}

  getShortURL(url: string): Observable<string> {
    return this.httpClient
      .get<Message>(`/api/short/${encodeURI(url)}`)
      .pipe(map((e) => e.url));
  }

  getFillURL(shorturl: string): Observable<string> {
    return this.httpClient
      .get<Message>(`/api/long/${encodeURI(shorturl)}`)
      .pipe(map((e) => e.url));
  }
}

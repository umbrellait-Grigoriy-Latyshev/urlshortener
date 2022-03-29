import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import {
  URLMessage,
  StatusMessage,
  CreateShortURLMessage,
} from '@evolving/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class ShortenService {
  constructor(private httpClient: HttpClient) {}

  getShortURL(fullurl: string, suggested?: string): Observable<URLMessage> {
    suggested = suggested?.length === 0 ? undefined : suggested;
    const body: CreateShortURLMessage = {
      url: fullurl
    };
    if (suggested)
      body.suggested = suggested;
    return this.httpClient.post<URLMessage>(`/api/short`, body);
  }

  getFullURL(shorturl: string): Observable<URLMessage> {
    return this.httpClient.get<URLMessage>(`/api/long/${encodeURI(shorturl)}`);
  }

  isAvailable(shorturl: string): Observable<boolean> {
    return this.httpClient
      .get<StatusMessage>(`/api/available/${shorturl}`)
      .pipe(map((e) => e.success));
  }
}

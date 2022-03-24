import { Component, OnInit } from '@angular/core';
import { ShortenService } from '../shorten.service';

import isURL from 'validator/lib/isURL';
import { Observable } from 'rxjs';

@Component({
  selector: 'evolving-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  url: string = '';
  shorturl: string = '';

  updated = false;

  public isUrlCorrect(url: string): boolean {
    return isURL(url);
  }

  constructor(private shortService: ShortenService) {}

  ngOnInit(): void {}

  updateUrl(event: Event): void {
    this.url = (event.target as HTMLInputElement).value;
    this.updated = false;
  }

  shortify(): void {
    this.updated = false;
    this.shortService
      .getShortURL(this.url)
      .subscribe((shortUrl) => {
        this.shorturl = shortUrl;
        this.updated = true;
      });
  }
}

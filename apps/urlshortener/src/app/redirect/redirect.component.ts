import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ShortenService } from '../shorten.service';

@Component({
  selector: 'evolving-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss'],
})
export class RedirectComponent implements OnInit {
  url: string = '';
  constructor(
    private route: ActivatedRoute,
    private shortenService: ShortenService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const shorturl = paramMap.get('shorturl') || '';
      if (shorturl.length !== 0) {
        this.shortenService.getFullURL(shorturl).subscribe((fullurl) => {
          // prepend http as base (hope it will redirects to https)
          if (!fullurl.includes('http')) fullurl = `http://${fullurl}`;
          this.url = fullurl;

          setTimeout(() => {
            this.document.location.href = this.url;
          }, 3000);
        });
      }
    });
  }
}

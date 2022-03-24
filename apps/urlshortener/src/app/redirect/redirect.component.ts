import { Component, OnInit } from '@angular/core';
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
    private shortenService: ShortenService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const shorturl = paramMap.get('shorturl') || "";
      if (shorturl.length !== 0) {
        this.shortenService.getFullURL(shorturl).subscribe((fullurl) => {
          this.url = fullurl;
          setTimeout(() => {
            window.location.href = this.url;
          }, 3000);
        });
      }
    });
  }
}

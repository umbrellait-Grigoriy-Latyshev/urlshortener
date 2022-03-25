import { Component, OnInit } from '@angular/core';
import { ShortenService } from '../shorten.service';

import isURL from 'validator/lib/isURL';
import { Observable } from 'rxjs';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'evolving-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private urlValidator: ValidatorFn = (control: AbstractControl) => {
    return isURL(control.value) ? null : { invalidUrl: true };
  };

  formGroup = new FormGroup({
    url: new FormControl('', [Validators.required, this.urlValidator]),
  });

  shorturl: string = '';

  updated = false;

  constructor(private shortService: ShortenService) {}

  ngOnInit(): void {}

  shortify(): void {
    this.updated = false;
    this.shortService.getShortURL(this.formGroup.get("url")?.value).subscribe((shortUrl) => {
      this.shorturl = shortUrl;
      this.updated = true;
    });
  }
}

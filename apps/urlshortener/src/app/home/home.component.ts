import { Component, Inject, OnInit } from '@angular/core';
import { ShortenService } from '../shorten.service';
import isURL from 'validator/lib/isURL';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';

import { Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

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
    shorturl: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
  });

  updated = false;

  constructor(
    private shortService: ShortenService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {}

  getUrlFromShort(short: string): string {
    return `${this.document.location.origin}/r/${short}`;
  }

  shortify(): void {
    this.updated = false;
    this.shortService
      .getShortURL(this.formGroup.get('url')?.value)
      .subscribe((message) => {
        this.formGroup
          .get('shorturl')
          ?.setValue(this.getUrlFromShort(message.url));
        this.updated = true;
      });
  }
}

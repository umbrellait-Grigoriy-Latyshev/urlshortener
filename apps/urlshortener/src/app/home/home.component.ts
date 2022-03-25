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
import { filter, mergeMap, tap } from 'rxjs';

@Component({
  selector: 'evolving-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private urlValidator: ValidatorFn = (control: AbstractControl) => {
    return isURL(control.value) ? null : { invalidUrl: true };
  };

  private shortUrlValidator = (toggled: boolean) => {
    return (control: AbstractControl) => {
      const valid = toggled && control.value.length !== 0;
      return valid ? null : { invalidUrl: true };
    };
  };

  formGroup = new FormGroup({
    url: new FormControl('', [Validators.required, this.urlValidator]),
    shorturl: new FormControl(''),
    toggle: new FormControl(false),
  });

  updated = false;

  constructor(
    private shortService: ShortenService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // watch short url validator depends on toggle
    this.formGroup.get('toggle')?.valueChanges.subscribe((value) => {
      this.formGroup
        .get('shorturl')
        ?.setValidators(this.shortUrlValidator(value));
    });

    this.formGroup
      .get('shorturl')
      ?.valueChanges.pipe(
        mergeMap((value) => this.shortService.isAvailable(value)),
        filter((isAvailable) => !isAvailable),
        tap((_) => {
          this.formGroup.get('shorturl')?.setErrors({ invalidUrl: true });
        })
      )
      .subscribe();
  }

  isToggled(): boolean {
    return this.formGroup.get('toggle')?.value;
  }

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

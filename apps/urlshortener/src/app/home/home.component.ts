import { Component, Inject, OnInit } from '@angular/core';
import { ShortenService } from '../shorten.service';
import isURL from 'validator/lib/isURL';
import { Location } from '@angular/common';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';

import { Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { filter, mergeMap, tap } from 'rxjs';
import { Router } from '@angular/router';


// Validators
// validate that url is valid
const urlValidator: ValidatorFn = (control: AbstractControl) => {
  return isURL(control.value) ? null : { invalidUrl: true };
};

@Component({
  selector: 'evolving-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  formGroup = new FormGroup({
    url: new FormControl('', [Validators.required, urlValidator]),
    shorturl: new FormControl(''),
    toggle: new FormControl(false),
  });

  updated = false;

  constructor(
    private shortService: ShortenService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    // watch short url validator depends on toggle
    this.formGroup.get('toggle')?.valueChanges.subscribe((value) => {
      const item = this.formGroup.get('shorturl');
      if (!value) {
        item?.setValue('');
        item?.setValidators(null);
        item?.reset();
      } else item?.setValidators(Validators.required);
    });

    this.formGroup
      .get('shorturl')
      ?.valueChanges.pipe(
        filter((value) => value.length !== 0),
        mergeMap((value) => this.shortService.isAvailable(value)),
        filter((isAvailable) => !isAvailable),
        tap((_) => {
          this.formGroup.get('shorturl')?.setErrors({ invalidUrl: true });
        })
      )
      .subscribe();
    this.formGroup.valueChanges.subscribe(_ => this.updated = false);
  }

  getShortU(): string {
    const url = this._location.prepareExternalUrl(this.router.serializeUrl(
      this.router.createUrlTree(this.getShortRoute())
    ));
    return [this.document.location.origin, url].join("/");
  }

  getShortRoute(): string[] {
    if (!this.formGroup.get('shorturl')?.value) return ["/"];
    return ["r", this.formGroup.get('shorturl')?.value];
  }

  isToggled(): boolean {
    return this.formGroup.get('toggle')?.value;
  }

  shortify(): void {
    this.updated = false;
    this.shortService
      .getShortURL(
        this.formGroup.get('url')?.value,
        this.formGroup.get('shorturl')?.value || ''
      )
      .subscribe((message) => {
        if (message.success)
          this.formGroup.get('shorturl')?.setValue(message.url);
        this.updated = true;
      });
  }
}

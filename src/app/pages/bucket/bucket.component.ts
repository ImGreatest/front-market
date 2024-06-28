import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {
  TuiAccordionModule,
  TuiInputCountModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputPhoneModule
} from "@taiga-ui/kit";
import { TuiButtonModule, TuiIconsModule } from "@taiga-ui/experimental";
import { UserBucketService } from "@services";
import { defaultIfEmpty, map, Observable, of } from "rxjs";
import { IResBucketDto } from "@interfaces";
import { TuiSvgModule, TuiTextfieldControllerModule } from "@taiga-ui/core";
import { AsyncPipe, NgForOf } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-bucket',
  standalone: true,
	imports: [
		ReactiveFormsModule,
		TuiAccordionModule,
		TuiButtonModule,
		TuiIconsModule,
		TuiInputModule,
		TuiInputNumberModule,
		TuiInputPhoneModule,
		TuiInputCountModule,
		TuiTextfieldControllerModule,
		AsyncPipe,
		NgForOf,
		TuiSvgModule
	],
  templateUrl: './bucket.component.html',
  styleUrl: './bucket.component.css'
})
export class BucketComponent implements OnInit {
  total: number = 0;
  navBarProfileName: string = 'Войти';
  bucket$ = new Observable<IResBucketDto[]>;
  testForms: FormGroup<{ testValue1: FormControl<number>; }>[] = [];

  constructor(
    private router: Router,
    private userBucketService: UserBucketService,
  ) {}

  ngOnInit() {
    if (localStorage.getItem('email') && localStorage.getItem('role') && localStorage.getItem('fullname')) {
      const email = localStorage.getItem('email');
      if (email !== null) {
        this.navBarProfileName = email;
      }
    }
    this.bucket$ = this.userBucketService.getBucket(localStorage.getItem('id')!);
    this.bucket$.subscribe(v => {
      v.forEach(item => {
        const form = new FormGroup({
          testValue1: new FormControl(item.count, {
            nonNullable: true,
            validators: Validators.required,
          }),
        });
        this.testForms.push(form);
        this.total += item.product.price * item.count;
      });
    });
  }

  editProductBucket(index: number, item: IResBucketDto) {
    const form = this.testForms[index];
    const count: number = form.get('testValue1')?.value || 0;
    this.userBucketService.updateBucket(localStorage.getItem('id')!, item.product.id, { count }).subscribe(() => {})
  }

  removeFromBucket(index: number, item: IResBucketDto) {
    this.userBucketService.deleteBucket(localStorage.getItem('id')!, item.product.id)
      .subscribe(() => {
        this.bucket$.subscribe(bucket => {
          const updatedBucket = [...bucket];
          updatedBucket.slice(index, 1);
          this.bucket$ = of(updatedBucket);
          this.testForms.slice(index, 1);
          this.calculateTotal();
        })
      })
  }

  onClickProfile(): void {
    if (this.navBarProfileName === 'Войти') {
      this.router.navigate(['/auth/login']);
    } else {
      this.router.navigate(['/profile']);
    }
  }

  onClickBucket(): void {
    this.router.navigate(['/bucket']);
  }

  onClickLogo(): void {
    this.router.navigate(['/catalog']);
  }

  calculateTotal() {
    this.total = this.testForms.reduce((acc, form) => {
      const count = form.get('testValue1')?.value || 0;
      const price = form.get('testValue1')?.value || 0;
      return acc + (price * count);
    }, 0);
  }
}

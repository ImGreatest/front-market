import { Component, OnInit } from '@angular/core';
import { TuiSvgModule } from "@taiga-ui/core";
import { Router } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { TuiAccordionModule, TuiInputCountModule, TuiInputModule, TuiInputPhoneModule } from "@taiga-ui/kit";
import { TuiButtonModule, TuiIconsModule } from "@taiga-ui/experimental";
import { Observable } from "rxjs";
import { ProductService } from "@services";
import { IResProductDto } from "@interfaces";
import { AsyncPipe, NgForOf } from "@angular/common";

@Component({
  selector: 'app-view-good',
  standalone: true,
  imports: [
    TuiSvgModule,
    ReactiveFormsModule,
    TuiAccordionModule,
    TuiButtonModule,
    TuiIconsModule,
    TuiInputCountModule,
    TuiInputModule,
    TuiInputPhoneModule,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './view-good.component.html',
  styleUrl: './view-good.component.css'
})
export class ViewGoodComponent implements OnInit {
  navBarProfileName: string = 'Войти';
  products$ = new Observable<IResProductDto[]>;

  constructor(
    private router: Router,
    private productService: ProductService,
  ) {}

  ngOnInit() {
    if (localStorage.getItem('email') && localStorage.getItem('role') && localStorage.getItem('fullname')) {
      const email = localStorage.getItem('email');
      if (email !== null) {
        this.navBarProfileName = email;
      }
    }
    this.products$ = this.productService.getProducts();
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
}

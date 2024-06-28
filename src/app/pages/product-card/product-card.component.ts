import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService, UserBucketService } from "@services";
import { ReactiveFormsModule } from "@angular/forms";
import { TuiAccordionModule, TuiInputCountModule, TuiInputModule, TuiInputPhoneModule } from "@taiga-ui/kit";
import { TuiButtonModule, TuiIconsModule } from "@taiga-ui/experimental";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { TuiSidebarModule } from "@taiga-ui/addon-mobile";
import { TuiSvgModule, TuiTextfieldControllerModule } from "@taiga-ui/core";
import { IResProductDto } from "@interfaces";
import { Observable } from "rxjs";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiAccordionModule,
    TuiButtonModule,
    TuiIconsModule,
    TuiInputCountModule,
    TuiInputModule,
    TuiInputPhoneModule,
    AsyncPipe,
    NgForOf,
    TuiSidebarModule,
    TuiSvgModule,
    TuiTextfieldControllerModule,
    NgIf
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  product$ = new Observable<IResProductDto>;
  navBarProfileName: string = 'Войти';
  sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private userBucketService: UserBucketService,
  ) {}

  ngOnInit() {
    if (localStorage.getItem('email') && localStorage.getItem('role') && localStorage.getItem('fullname')) {
      const email = localStorage.getItem('email');
      if (email !== null) {
        this.navBarProfileName = email;
      }
    }

    this.route.params.subscribe(params => {
      const id = params['id']
      this.product$ = this.productService.getProduct(id);
    });
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

  onToCatalog(): void {
    this.router.navigate(['/catalog']);
  }

  addToBucket(id: string) {
    console.log(id, localStorage.getItem('id')!);
    this.userBucketService.addToBucket({
      userId: localStorage.getItem('id')!,
      productId: id,
      count: 1,
    }).subscribe(v => console.log(v));
    this.router.navigate(['/bucket']);
  }
}

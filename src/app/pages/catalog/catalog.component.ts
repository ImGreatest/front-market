import { Component, OnInit } from '@angular/core';
import { CategoryProductService, CategoryService, ProductService, UserBucketService, UserService } from "@services";
import { debounceTime, distinctUntilChanged, map, Observable } from "rxjs";
import { IResCategoryDto, IResProductDto } from "@interfaces";
import { AsyncPipe, NgForOf } from "@angular/common";
import { Router, RouterOutlet } from "@angular/router";
import { TuiAccordionModule, TuiInputDateModule, TuiInputModule } from "@taiga-ui/kit";
import { TuiSidebarModule } from "@taiga-ui/addon-mobile";
import { TuiSvgModule, TuiTextfieldControllerModule } from "@taiga-ui/core";
import { TuiActiveZoneModule } from "@taiga-ui/cdk";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    RouterOutlet,
    TuiAccordionModule,
    TuiInputDateModule,
    TuiInputModule,
    TuiSidebarModule,
    TuiSvgModule,
    TuiTextfieldControllerModule,
    TuiActiveZoneModule,
    FormsModule
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  products$ = new Observable<IResProductDto[]>;
  open = false;
  searchTerm = '';
  navBarProfileName: string = 'Войти';
  categories$ = new Observable<IResCategoryDto[]>;

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private categoryProductService: CategoryProductService,
    private categoryService: CategoryService,
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
    this.filterProducts();
    this.categories$ = this.categoryService.getCategories();
  }

  viewProduct(id: string): void {
    this.router.navigate(['/product', id]);
  }

  filterProducts() {
    this.products$ = this.productService.getProducts().pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(p => p.filter(p => p.name.toLowerCase().includes(this.searchTerm.toLowerCase())))
    );
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

  onClickCategory(id: string) {
    localStorage.setItem('categoryId', id);
  }

  toggle(open: boolean): void {
    this.open = open;
  }
}

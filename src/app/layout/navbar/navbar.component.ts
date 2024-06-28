import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { TuiSvgModule, TuiTextfieldControllerModule } from "@taiga-ui/core";
import { TuiAccordionModule, TuiInputModule } from "@taiga-ui/kit";
import { Router, RouterOutlet } from "@angular/router";
import { TuiActiveZoneModule } from "@taiga-ui/cdk";
import { TuiSidebarModule } from "@taiga-ui/addon-mobile";
import { CategoryService } from "@services";
import { IResCategoryDto } from "@interfaces";
import { Observable } from "rxjs";

@Component({
  imports: [
    CommonModule,
    TuiSvgModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    RouterOutlet,
    TuiActiveZoneModule,
    TuiSidebarModule,
    TuiAccordionModule
  ],
  selector: 'app-navbar',
  standalone: true,
  styleUrl: './navbar.component.css',
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  open = false;
  navBarProfileName: string = 'Войти';
  categories$ = new Observable<IResCategoryDto[]>;

  constructor(
    private route: Router,
    private categoryService: CategoryService,
  ) {}

  ngOnInit() {
    if (localStorage.getItem('email') && localStorage.getItem('role') && localStorage.getItem('fullname')) {
      const email = localStorage.getItem('email');
      if (email !== null) {
        this.navBarProfileName = email;
      }
    }
    this.categories$ = this.categoryService.getCategories();
  }

  onClickProfile(): void {
    if (this.navBarProfileName === 'Войти') {
      this.route.navigate(['/auth/login']);
    } else {
      this.route.navigate(['/profile']);
    }
  }

  onClickBucket(): void {
    this.route.navigate(['/bucket']);
  }

  onClickLogo(): void {
    this.route.navigate(['/catalog']);
  }

  onClickCategory(id: string) {
    localStorage.setItem('categoryId', id);
  }

  toggle(open: boolean): void {
    this.open = open;
  }
}

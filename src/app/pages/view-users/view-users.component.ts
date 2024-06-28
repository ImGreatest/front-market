import { Component, OnInit } from '@angular/core';
import { TuiSvgModule } from "@taiga-ui/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TuiAccordionModule, TuiInputCountModule, TuiInputModule, TuiInputPhoneModule } from "@taiga-ui/kit";
import { TuiButtonModule, TuiIconsModule } from "@taiga-ui/experimental";
import { Observable } from "rxjs";
import { UserService } from "@services";
import { IResUserDto } from "@interfaces";
import { AsyncPipe, NgForOf } from "@angular/common";

@Component({
  selector: 'app-view-users',
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
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent implements OnInit{
  navBarProfileName: string = 'Войти';
  user$ = new Observable<IResUserDto[]>;

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit() {
    if (localStorage.getItem('email') && localStorage.getItem('role') && localStorage.getItem('fullname')) {
      const email = localStorage.getItem('email');
      if (email !== null) {
        this.navBarProfileName = email;
      }
    }
    this.user$ = this.userService.getUsers();
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

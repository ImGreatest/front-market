import { Component, OnInit } from '@angular/core';
import { TuiAccordionModule, TuiInputModule, TuiInputPhoneModule, TuiSelectModule } from "@taiga-ui/kit";
import { TuiButtonModule } from "@taiga-ui/experimental";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { firstValueFrom } from "rxjs";
import { UserService } from "@services";
import { TuiAlertModule, TuiSvgModule } from "@taiga-ui/core";
import { Router } from "@angular/router";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    TuiAccordionModule,
    TuiButtonModule,
    TuiSelectModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPhoneModule,
    TuiAlertModule,
    TuiSvgModule,
    NgIf,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  navBarProfileName: string = 'Войти';
  fioForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  phoneForm = new FormGroup({
    phone: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  emailForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (localStorage.getItem('email') && localStorage.getItem('role') && localStorage.getItem('fullname')) {
      const email = localStorage.getItem('email');
      if (email !== null) {
        this.navBarProfileName = email;
      }
    }
    if (localStorage.getItem('id') === null) {
      this.router.navigate(['/catalog']);
    }
  }

  get _name() {
    return this.fioForm.controls.name.value;
  }

  get _phone() {
    return this.phoneForm.controls.phone.value;
  }

  get _email() {
    return this.emailForm.controls.email.value;
  }

  checkRole(): boolean {
    return localStorage.getItem('role') === 'manager' || localStorage.getItem('role') === 'admin';
  }

  async onFio() {
    this.fioForm.markAsTouched();
    Object.values(this.fioForm.controls).map((control) => control.updateValueAndValidity());
    if (this.fioForm.valid) {
      await this._onChangeFio(this._name);
    }
  }

  async onPhone() {
    this.phoneForm.markAsTouched();
    Object.values(this.phoneForm.controls).map((control) => control.updateValueAndValidity());
    if (this.phoneForm.valid) {
      await this._onChangePhone(this._phone);
    }
  }

  async onEmail() {
    this.emailForm.markAsTouched();
    Object.values(this.emailForm.controls).map((control) => control.updateValueAndValidity());
    if (this.emailForm.valid) {
      await this._onChangeEmail(this._email);
    }
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

  onClickViewUser(): void {
    this.router.navigate(['/view-users']);
  }

  onClickViewGood(): void {
    this.router.navigate(['/view-good']);
  }

  onLeave(): void {
    localStorage.removeItem('id');
    localStorage.removeItem('fullname');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('categoryId');
    this.router.navigate(['/auth/login']);
  }

  private async _onChangeFio(name: string): Promise<void> {
    const userId = localStorage.getItem('id');
    if (userId) {
      const user = await firstValueFrom(this.userService.getUser(userId));
      const updatedUser = await firstValueFrom(
        this.userService.updateUser(user.id, {
          fullname: name,
          role: user.role,
          login: user.login,
          password: user.password,
          phone: user.phone,
        }),
      );
      console.log(updatedUser);
    }
  }

  private async _onChangePhone(phone: string): Promise<void> {
    const userId = localStorage.getItem('id');
    if (userId) {
      const user = await firstValueFrom(this.userService.getUser(userId));
      const updatedUser = await firstValueFrom(
        this.userService.updateUser(user.id, {
          fullname: user.fullname,
          role: user.role,
          login: user.login,
          password: user.password,
          phone: phone,
        }),
      );
      console.log(updatedUser);
    }
  }

  private async _onChangeEmail(email: string): Promise<void> {
    const userId = localStorage.getItem('id');
    if (userId) {
      const user = await firstValueFrom(this.userService.getUser(userId));
      const updatedUser = await firstValueFrom(
        this.userService.updateUser(user.id, {
          fullname: user.fullname,
          role: user.role,
          login: email,
          password: user.password,
          phone: user.phone,
        }),
      );
      console.log(updatedUser);
    }
  }
}

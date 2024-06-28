import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { IAuthForm } from "../sign-up/interface/auth.interface";
import { TuiButtonModule, TuiIconsModule } from "@taiga-ui/experimental";
import { TuiInputModule, TuiInputPasswordModule } from "@taiga-ui/kit";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { UserService } from "@services";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiIconsModule,
    TuiInputModule,
    TuiInputPasswordModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  readonly form: FormGroup<IAuthForm> = new FormGroup({
    login: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    private route: Router,
    private userService: UserService,
  ) {}

  get _login() {
    return this.form.controls.login.value;
  }

  get _password() {
    return this.form.controls.password.value;
  }

  onLogin() {
    this.form.markAsTouched();
    Object.values(this.form.controls).map((control) => control.updateValueAndValidity());
    if (this.form.valid) {
      this._OnLogin(this._login, this._password).then((r) => r);
    }
  }

  private async _OnLogin(email: string, password: string): Promise<void> {
    await firstValueFrom(
      this.userService.getUserByLoginPass(email, password),
    );
    await this.route.navigate(['/catalog']);
  }

  onClickReg(): void {
    this.route.navigate(['/auth/sign-up']);
  }
}

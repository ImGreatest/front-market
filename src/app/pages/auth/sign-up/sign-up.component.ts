import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { IAuthForm } from "./interface/auth.interface";
import { Router } from "@angular/router";
import { TuiInputModule, TuiInputPasswordModule } from "@taiga-ui/kit";
import { TuiButtonModule } from "@taiga-ui/experimental";
import { firstValueFrom } from "rxjs";
import { UserService } from "@services";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    TuiInputModule,
    TuiInputPasswordModule,
    ReactiveFormsModule,
    TuiButtonModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
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
    this.form.markAsTouched()
    Object.values(this.form.controls).map((control) => control.updateValueAndValidity());
    if (this.form.valid) {
      this._OnLogin(this._login, this._password).then((r) => r);
    }
  }

  private async _OnLogin(email: string, password: string): Promise<void> {
    await firstValueFrom(
      this.userService.createUser({
        fullname: 'name',
        role: 'client',
        login: email.toString(),
        password: password.toString(),
        phone: '+7'
      }),
    );
    await this.route.navigate(['/auth/login']);
  }

  onClickLog(): void {
    this.route.navigate(['/auth/login']);
  }
}

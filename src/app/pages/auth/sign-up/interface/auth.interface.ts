import { FormControl } from "@angular/forms";

export interface IAuthForm {
  login: FormControl<string>;
  password: FormControl<string>;
}

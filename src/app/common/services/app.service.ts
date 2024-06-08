import { Injectable } from "@angular/core";
import { environments } from "../../../enviroments/environments";

@Injectable({ providedIn: 'root' })
export class AppService {
  readonly apiUrl: string;

  constructor() {
    this.apiUrl = environments.apiUrl;
  }
}

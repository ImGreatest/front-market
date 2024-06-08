import { Injectable } from "@angular/core";
import { AppService } from "../app.service";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    public http: HttpClient,
    private appService: AppService,
  ) {}

  get url(): string {
    return this.appService.apiUrl + '/user';
  }


}

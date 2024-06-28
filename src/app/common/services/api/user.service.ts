import { Injectable } from "@angular/core";
import { AppService } from "../app.service";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { IResUserDto, IReqCreateUserDto, IReqUpdateUserDto } from "@interfaces";

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    public http: HttpClient,
    private appService: AppService,
  ) {}

  get url(): string {
    return this.appService.apiUrl + '/user';
  }

  createUser(data: IReqCreateUserDto) {
    return this.http.post('http://localhost:3000/user/create-user', data);
  }

  getUser(userId: string): Observable<IResUserDto> {
    return this.http.get<IResUserDto>(`${this.url}/get-user/${userId}`);
  }

  getUsers(): Observable<IResUserDto[]> {
    return this.http.get<IResUserDto[]>(`${this.url}/get-users`);
  }

  getUserByLoginPass(login: string, password: string): Observable<IResUserDto> {
    return this.http.get<IResUserDto>(`${this.url}/check-user/${login}/${password}`).pipe(tap((data) => {
      localStorage.setItem('id', data.id);
      localStorage.setItem('fullname', data.fullname);
      localStorage.setItem('email', data.login);
      localStorage.setItem('role', data.role);
    }));
  }

  updateUser(userId: string, data: IReqUpdateUserDto): Observable<IResUserDto> {
    return this.http.put<IResUserDto>(`${this.url}/update-user/${userId}`, data);
  }

  deleteUser(userId: string): Observable<IResUserDto> {
    return this.http.delete<IResUserDto>(`${this.url}/delete-user/${userId}`);
  }
}

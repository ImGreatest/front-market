import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppService } from "../app.service";
import { Observable } from "rxjs";
import { IReqCreateSizeDto, IReqUpdateSizeDto, IResSizeDto } from "@interfaces";

@Injectable({ providedIn: 'root' })
export class SizesService {
  constructor(
    public http: HttpClient,
    private appService: AppService,
  ) {}

  get url(): string {
    return this.appService.apiUrl + '/sizes';
  }

  createSize(data: IReqCreateSizeDto) {
    return this.http.post(`${this.url}/create-size`, data);
  }

  getSize(id: string): Observable<IResSizeDto> {
    return this.http.get<IResSizeDto>(`${this.url}/get-size/${id}`);
  }

  getSizes(): Observable<IResSizeDto[]> {
    return this.http.get<IResSizeDto[]>(`${this.url}/get-sizes`);
  }

  getSizeByName(name: string): Observable<IResSizeDto[]> {
    return this.http.get<IResSizeDto[]>(`${this.url}/get-size-by-name/${name}`);
  }

  updateSize(id: string, data: IReqUpdateSizeDto) {
    return this.http.put(`${this.url}/update-size/${id}`, data);
  }

  deleteSize(id: string) {
    return this.http.delete(`${this.url}/delete-size/${id}`);
  }
}

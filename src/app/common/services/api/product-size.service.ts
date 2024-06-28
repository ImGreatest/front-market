import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppService } from "@services";
import { IReqSetSizeDto, IResProductSize, IReqChangeAbleDto } from "@interfaces";
import { Observable } from "rxjs";

@Injectable()
export class ProductSizeService {
  constructor(
    public http: HttpClient,
    private appService: AppService,
  ) {}

  get url(): string {
    return this.appService.apiUrl + '/product-size';
  }

  setSize(data: IReqSetSizeDto) {
    return this.http.post(`${this.url}/set-size`, data);
  }

  getSize(productId: string, sizeId: string): Observable<IResProductSize> {
    return this.http.get<IResProductSize>(`${this.url}/get-size/${productId}/${sizeId}`);
  }

  getSizesProduct(id: string): Observable<IResProductSize[]> {
    return this.http.get<IResProductSize[]>(`${this.url}/get-sizes-product/${id}`);
  }

  updateSize(productId: string, sizeId: string, data: IReqChangeAbleDto) {
    return this.http.put(`${this.url}/update-size/${productId}/${sizeId}`, data);
  }

  deleteSize(productId: string, sizeId: string) {
    return this.http.delete(`${this.url}/delete-size/${productId}/${sizeId}`);
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppService } from "@services";
import { Observable } from "rxjs";
import { IReqCreateProductDto, IResProductDto, IReqUpdateProductDto } from "@interfaces";

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(
    public http: HttpClient,
    private appService: AppService,
  ) {}

  get url(): string {
    return this.appService.apiUrl + '/product';
  }

  createProduct(data: IReqCreateProductDto) {
    return this.http.post(`${this.url}/create-product`, data);
  }

  getProduct(id: string): Observable<IResProductDto> {
    return this.http.get<IResProductDto>(`${this.url}/get-product/${id}`);
  }

  getProductByName(name: string): Observable<IResProductDto[]> {
    return this.http.get<IResProductDto[]>(`${this.url}/get-product-by-name/${name}`);
  }

  getProducts(): Observable<IResProductDto[]> {
    return this.http.get<IResProductDto[]>(`${this.url}/get-products`);
  }

  updateProduct(id: string, data: IReqUpdateProductDto) {
    return this.http.put(`${this.url}/update-product/${id}`, data);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.url}/delete-product/${id}`);
  }
}

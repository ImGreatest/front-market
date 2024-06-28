import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppService } from "@services";
import { IReqSetCategoryProductDto, IResCategoryProductDto } from "@interfaces";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CategoryProductService {
  constructor(
    public http: HttpClient,
    private appService: AppService,
  ) {}

  get url(): string {
    return this.appService.apiUrl + 'category-product';
  }

  setCategoryProduct(data: IReqSetCategoryProductDto) {
    return this.http.post(`${this.url}/set-category-product`, data);
  }

  getByCategory(id: string): Observable<IResCategoryProductDto[]> {
    return this.http.get<IResCategoryProductDto[]>(`${this.url}/get-by-category/${id}`);
  }

  getByProduct(id: string): Observable<IResCategoryProductDto[]> {
    return this.http.get<IResCategoryProductDto[]>(`${this.url}/get-by-product/${id}`);
  }

  getAll(): Observable<IResCategoryProductDto[]> {
    return this.http.get<IResCategoryProductDto[]>(`${this.url}/get-all`);
  }

  unSetCategoryProduct(categoryId: string, productId: string) {
    return this.http.delete(`${this.url}/unset-category-product/${categoryId}/${productId}`);
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppService } from "@services";
import { IResCategoryDto, IReqCreateCategoryDto, IReqUpdateCategoryDto } from "@interfaces";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(
    public http: HttpClient,
    private appService: AppService,
  ) {}

  get url(): string {
    return this.appService.apiUrl + '/category';
  }

  createCategory(data: IReqCreateCategoryDto): Observable<IReqCreateCategoryDto> {
    return this.http.post<IReqCreateCategoryDto>(`${this.url}/create-category`, data);
  }

  getCategory(categoryId: string): Observable<IResCategoryDto> {
    return this.http.get<IResCategoryDto>(`${this.url}/get-category/${categoryId}`);
  }

  getCategoryByName(categoryName: string): Observable<IResCategoryDto[]> {
    return this.http.get<IResCategoryDto[]>(`${this.url}/get-category-by-name/${categoryName}`);
  }

  getCategories(): Observable<IResCategoryDto[]> {
    return this.http.get<IResCategoryDto[]>(`${this.url}/get-categories`);
  }

  updateCategory(id: string, data: IReqUpdateCategoryDto): Observable<IResCategoryDto> {
    return this.http.put<IResCategoryDto>(`${this.url}/update-category/${id}`, data);
  }

  deleteCategory(id: string): Observable<IResCategoryDto> {
    return this.http.delete<IResCategoryDto>(`${this.url}/delete-category/${id}`);
  }
}

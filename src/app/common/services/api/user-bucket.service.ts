import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppService } from "@services";
import { IReqAddBucketDto, IReqUpdateBucketDto, IResBucketDto, IResGetCellBucketsDto } from "@interfaces";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserBucketService {
  constructor(
    public http: HttpClient,
    private appService: AppService,
  ) {}

  get url(): string {
    return this.appService.apiUrl + '/user-bucket';
  }

  addToBucket(data: IReqAddBucketDto) {
    return this.http.post(`${this.url}/add-bucket`, data);
  }

  getBucket(userId: string): Observable<IResBucketDto[]> {
    return this.http.get<IResBucketDto[]>(`${this.url}/get-bucket/${userId}`);
  }

  getCellBuckets(userId: string, productId: string): Observable<IResGetCellBucketsDto> {
    return this.http.get<IResGetCellBucketsDto>(`${this.url}/get-cell-buckets/${userId}/${productId}`);
  }

  updateBucket(userId: string, productId: string, data: IReqUpdateBucketDto) {
    return this.http.put(`${this.url}/update-bucket/${userId}/${productId}`, data);
  }

  deleteBucket(userId: string, productId: string) {
    return this.http.delete(`${this.url}/delete-bucket/${userId}/${productId}`);
  }
}

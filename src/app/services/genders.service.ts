import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface ICreate {

}

interface IEdit {

}

@Injectable({
  providedIn: 'root'
})

export class GendersService {

  url: string = 'genders/';

  constructor(
    private readonly http: HttpClient
  ) { 

  }

  getAll(userid: number): Observable<any> {

    return this.http.get(this.url + userid)

  }

  create(category: ICreate): Observable<any> {

    return this.http.post(this.url, category)

  }

  edit(category: IEdit): Observable<any> {

    return this.http.patch(this.url, category)

  }

  delete(categoryId: number): Observable<any> {

    return this.http.delete(this.url + categoryId)

  }

}

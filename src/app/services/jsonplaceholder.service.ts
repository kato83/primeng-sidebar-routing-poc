import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JSONPlaceholderService {

  #httpClient = inject(HttpClient);

  /**
   * 投稿1件取得
   * @param id 取得対象となるID
   * @returns JSONレスポンス
   */
  getPostById(id: number) {
    return this.#httpClient.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

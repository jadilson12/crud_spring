import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  apiURL = 'http://localhost:8080/produtos';

  constructor(
    private httpClient: HttpClient
  ) { }

  getProduto() {
    return this.httpClient.get(this.apiURL);
  }

  deleteProduto(id) {
    return this.httpClient.delete(this.apiURL + '/' + id);
  }

  setProduto(produto) {
    return this.httpClient.post(this.apiURL, produto);
  }
}

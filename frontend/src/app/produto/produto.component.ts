import { ProdutoService } from './../produto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  produto = {};
  produtos = [];
  button = 'Adicionar';
  display = false;
  constructor(
  private ProdutoServices: ProdutoService,
  ) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.ProdutoServices.getProduto()
      .subscribe(response => this.produtos = <any> response);
  }

  showDialog() {
      this.display = true;
  }

}

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
  button = 'Salvar';
  display = false;
  constructor(
  private ProdutoServices: ProdutoService,
  ) { }

  ngOnInit() {
    this.list();
  }

  showDialog() {
      this.display = !this.display;
  }

  show(id) {
    this.showDialog();
    this.ProdutoServices.showProduto(id)
      .subscribe(response => this.produto = <any> response);
  }
  list() {
    this.ProdutoServices.getProduto()
      .subscribe(response => this.produtos = <any> response);
  }

  salvar() {
    if (!this.produto.hasOwnProperty('id')) {
      this.create();
    } else {
      this.ProdutoServices.updateProduto(this.produto)
        .subscribe(() => {
          this.produto = {};
          this.list();
          this.button = 'Salvar';
          this.showDialog();
        });
    }
  }

  create() {
    this.ProdutoServices.setProduto(this.produto)
    .subscribe(() => {
      this.produto = {};
      this.list();
      this.showDialog();
    });
  }

  delete(id) {
  this.ProdutoServices.deleteProduto(id)
    .subscribe(response => {
      this.produtos = <any> response;
      this.list();
    });
  }

}

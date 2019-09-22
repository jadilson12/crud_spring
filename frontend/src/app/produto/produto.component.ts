import { ProdutoService } from './../produto.service';
import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

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
    private messageService: MessageService
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
          this.messageService.add({
              severity: 'success',
              summary: 'Produto atualizado com sucesso!',
              });
          },
          response => {
            let msg = 'Erro inesperado. Tente novamente';
            if (response.error.message) {
              msg = response.error.message;
            }
            this.messageService.add({
              severity: 'error',
              summary: msg
            });
        });
    }
  }

  create() {
    this.ProdutoServices.setProduto(this.produto)
    .subscribe(() => {
      this.produto = {};
      this.list();
      this.showDialog();
      this.messageService.add({
          severity: 'success',
          summary: 'Produto adicionada com sucesso!',
          });
      },
      resposta => {
        let msg = 'Erro inesperado. Tente novamente';
        if (resposta.error.message) {
          msg = resposta.error.message;
        }
        this.messageService.add({
          severity: 'error',
          summary: msg
        });
      });
  }

  delete(id) {
  this.ProdutoServices.deleteProduto(id)
    .subscribe(response => {
      this.produtos = <any> response;
      this.list();
      this.messageService.add({
          severity: 'success',
          summary: 'Produto excluido com sucesso!',
          });
      },
      response => {
        let msg = 'Erro inesperado. Tente novamente';
        if (response.error.message) {
          msg = response.error.message;
        }
        this.messageService.add({
          severity: 'error',
          summary: msg
        });
    });
  }

}

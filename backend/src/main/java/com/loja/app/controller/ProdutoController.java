package com.loja.app.controller;

import com.loja.app.models.Produto;
import com.loja.app.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@CrossOrigin // Cors permite todos acessos
@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtos;

    @GetMapping
    public List<Produto> get() {
        return  produtos.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Produto create(@Valid @RequestBody Produto produto) {
        Optional<Produto> produtoExistente = produtos
                .findProdutoByCategoria(produto.getCategoria());
        if (produtoExistente.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Categoria já existente!");
        }
        return produtos.save(produto);
    }
}

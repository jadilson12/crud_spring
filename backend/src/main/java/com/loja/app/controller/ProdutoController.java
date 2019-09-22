package com.loja.app.controller;

import com.loja.app.models.Produto;
import com.loja.app.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/{id}")
    public ResponseEntity<Produto> show(@PathVariable Long id) {
        Optional<Produto> produto = produtos.findById(id);
        if (produto.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return  ResponseEntity.ok(produto.get());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Produto> delete(@PathVariable Long id) {
        Optional<Produto> produto = produtos.findById(id);
        if (produto.isPresent()) {
            produtos.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public Produto edit(@PathVariable Long id, @RequestBody Produto produto) {
        produtos.findById(id);
        return produtos.save(produto);
    }

}

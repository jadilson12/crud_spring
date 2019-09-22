package com.loja.app.repository;

import com.loja.app.models.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProdutoRepository  extends JpaRepository<Produto, Long> {
    Optional<Produto> findProdutoByCategoria(String categoria);
}

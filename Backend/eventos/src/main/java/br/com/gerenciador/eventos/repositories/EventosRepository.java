package br.com.gerenciador.eventos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.gerenciador.eventos.entities.Eventos;

@Repository
public interface EventosRepository extends JpaRepository<Eventos, Integer> {

}

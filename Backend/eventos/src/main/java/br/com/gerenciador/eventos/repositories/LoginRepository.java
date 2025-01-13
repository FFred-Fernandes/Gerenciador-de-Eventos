package br.com.gerenciador.eventos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.gerenciador.eventos.entities.Login;

@Repository
public interface LoginRepository extends JpaRepository<Login, Integer> {
	Login findByEmail(String email);
}

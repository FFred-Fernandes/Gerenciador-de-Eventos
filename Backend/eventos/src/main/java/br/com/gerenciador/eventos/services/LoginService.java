package br.com.gerenciador.eventos.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.gerenciador.eventos.entities.Login;
import br.com.gerenciador.eventos.repositories.LoginRepository;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    public Login cadastrarLogin(Login login) {
        try {
            return loginRepository.save(login);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao cadastrar administrador.", e);
        }
    }

    public boolean loginLogin(String email, String senha) {
        Login login = loginRepository.findByEmail(email);
        if (login != null) {
            return senha.equals(login.getSenha());
        }
        return false;
    }
}
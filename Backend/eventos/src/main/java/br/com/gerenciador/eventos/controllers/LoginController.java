package br.com.gerenciador.eventos.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.gerenciador.eventos.dto.MessageResponseDTO;
import br.com.gerenciador.eventos.entities.Login;
import br.com.gerenciador.eventos.services.LoginService;

@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/cadastro")
    public ResponseEntity<MessageResponseDTO> cadastrarLogin(@RequestBody Login login) {
        loginService.cadastrarLogin(login);
        return ResponseEntity.ok(new MessageResponseDTO("Administrador cadastrado com sucesso!"));
    }

    @PostMapping("/login")
    public ResponseEntity<MessageResponseDTO> loginAdministrador(@RequestParam String email, @RequestParam String senha) {
        boolean sucesso = loginService.loginLogin(email, senha);
        if (sucesso) {
            return ResponseEntity.ok(new MessageResponseDTO("Login efetuado com sucesso!"));
        } else {
            return ResponseEntity.status(401).body(new MessageResponseDTO("Email ou senha incorretos."));
        }
    }
    
}

package br.com.gerenciador.eventos.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.gerenciador.eventos.dto.EventosAtualizadoDTO;
import br.com.gerenciador.eventos.dto.EventosRequestDTO;
import br.com.gerenciador.eventos.dto.EventosResponseDTO;
import br.com.gerenciador.eventos.dto.MessageResponseDTO;
import br.com.gerenciador.eventos.services.EventosService;

@RestController
@RequestMapping("/eventos")
public class EventosController {

    @Autowired
    private EventosService eventosService;

	@PostMapping("/adicionando-evento")
	public ResponseEntity<?> adicionandoEventos(@RequestBody EventosRequestDTO evento) {
		eventosService.adicionandoEventos(evento);
		return ResponseEntity.ok(new MessageResponseDTO("Evento adicionado com sucesso!"));
	}
	
	@GetMapping("/buscando-evento/{id}")
	public EventosResponseDTO buscarEventos(@PathVariable Integer id) {
		return eventosService.buscarEventos(id);
	}
	
	@DeleteMapping("/deletando-evento/{id}")
	public ResponseEntity<String> deletarId(@PathVariable Integer id) {
		boolean resultDelete = eventosService.eventosDelete(id);
		if(resultDelete) {
			return ResponseEntity.status(HttpStatus.OK).body("Evento deletado com sucesso!");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Evento não deletado!");
		}
	}
	
	@PutMapping("/atualizando-evento/{id}")
	public String alterandoEventos(@PathVariable Integer id, @RequestBody EventosAtualizadoDTO eventos) {
	    return eventosService.alterandoEventos(id, eventos);
	}
}
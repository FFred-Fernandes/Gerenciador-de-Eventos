package br.com.gerenciador.eventos.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.gerenciador.eventos.dto.EventosAtualizadoDTO;
import br.com.gerenciador.eventos.dto.EventosRequestDTO;
import br.com.gerenciador.eventos.dto.EventosResponseDTO;
import br.com.gerenciador.eventos.entities.Eventos;
import br.com.gerenciador.eventos.repositories.EventosRepository;

@Service
public class EventosService {

    @Autowired
    EventosRepository eventosRepository;

	public void adicionandoEventos(EventosRequestDTO evento) {
		Eventos newEventos = new Eventos();
		newEventos.setNomeEvento(evento.getNomeEvento());
		newEventos.setData(evento.getData());
		newEventos.setLocalizacao(evento.getLocalizacao());
		newEventos.setImagem(evento.getImagem());
		
		eventosRepository.save(newEventos);
	}
	
	public EventosResponseDTO buscarEventos(Integer id) {
		Optional <Eventos> eventos = eventosRepository.findById(id);
		EventosResponseDTO eventosResponseDTO = new EventosResponseDTO();
		eventosResponseDTO.setNomeEvento(eventos.get().getNomeEvento());
		eventosResponseDTO.setData(eventos.get().getData());
		eventosResponseDTO.setLocalizacao(eventos.get().getLocalizacao());
		
		return eventosResponseDTO;
	}
	
	public boolean eventosDelete(Integer id) {
		if(eventosRepository.existsById(id)) {
			eventosRepository.deleteById(id);
			return true;
		} else {
			return false;
		}
	}
	
	public String alterandoEventos(Integer id, EventosAtualizadoDTO eventos) {
	    if (!eventosRepository.existsById(id)) {
	        throw new RuntimeException("Evento não encontrado!");
	    } else {
	        try {
	            Eventos eventoExistente = eventosRepository.findById(id).get();
	            eventoExistente.setData(eventos.getData());
	            eventoExistente.setLocalizacao(eventos.getLocalizacao());
	            eventosRepository.save(eventoExistente);
	            return "Data e localização do evento alterados com sucesso!";
	        } catch (Exception e) {
	            throw new RuntimeException("Evento não pode ser alterado!");
	        }
	    }
	}
	
	public List<Eventos> eventosList() {
		return eventosRepository.findAll();
	}
    
}

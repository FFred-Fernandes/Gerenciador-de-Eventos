package br.com.gerenciador.eventos.dto;

import java.time.LocalDate;

import br.com.gerenciador.eventos.entities.Eventos;

public class EventosResponseDTO {

    private String nomeEvento;
    private LocalDate data;
    private String localizacao;
    private String imagem;

	public String getNomeEvento() {
		return nomeEvento;
	}
	public void setNomeEvento(String nomeEvento) {
		this.nomeEvento = nomeEvento;
	}
	public LocalDate getData() {
		return data;
	}
	public void setData(LocalDate data) {
		this.data = data;
	}
	public String getLocalizacao() {
		return localizacao;
	}
	public void setLocalizacao(String localizacao) {
		this.localizacao = localizacao;
	}
	public String getImagem() {
		return imagem;
	}
	public void setImagem(String imagem) {
		this.imagem = imagem;
	}
	
	
	public Eventos toEventos() {
		return new Eventos(this.nomeEvento, this.data, this.localizacao, this.imagem);
	}
	
}
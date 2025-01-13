package br.com.gerenciador.eventos.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "eventos")
public class Eventos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    
    @Column(name = "nome_evento")
    private String nomeEvento;
    
    @Column(name = "data_evento")
    private LocalDate data;
    
    @Column(name = "localizacao_evento")
    private String localizacao;
    
	@Column(name = "imagem")
	private String imagem;
    
	public Eventos() {
	}

	public Eventos(Integer id, String nomeEvento, LocalDate data, String localizacao, String imagem) {
		super();
		this.id = id;
		this.nomeEvento = nomeEvento;
		this.data = data;
		this.localizacao = localizacao;
		this.imagem = imagem;
	}

	public Eventos(String nomeEvento, LocalDate data, String localizacao, String imagem) {
		super();
		this.nomeEvento = nomeEvento;
		this.data = data;
		this.localizacao = localizacao;
		this.imagem = imagem;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

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

}

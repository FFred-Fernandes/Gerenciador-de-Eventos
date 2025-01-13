import React, { useState, useEffect } from "react";
import "./Home.css";

export const Home = () => {
  const [eventos, setEventos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventoEditando, setEventoEditando] = useState(null);
  const [novoEvento, setNovoEvento] = useState({
    titulo: "",
    data: "",
    localizacao: "",
    imagem: "",
  });

  useEffect(() => {
    const eventosSalvos = JSON.parse(localStorage.getItem("eventos")) || [];
    setEventos(eventosSalvos);
  }, []);

  const handleOpenModal = (evento = null) => {
    if (evento) {
      setEventoEditando(evento);
      setNovoEvento({
        ...evento,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEventoEditando(null);
    setNovoEvento({
      titulo: "",
      data: "",
      localizacao: "",
      imagem: "",
    });
  };

  const handleChangeNovoEvento = (e) => {
    const { name, value } = e.target;
    setNovoEvento({ ...novoEvento, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNovoEvento((prev) => ({ ...prev, imagem: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdicionarEvento = () => {
    if (
      novoEvento.titulo &&
      novoEvento.data &&
      novoEvento.localizacao &&
      novoEvento.imagem
    ) {
      const novosEventos = [...eventos, { ...novoEvento, id: Date.now() }];
      setEventos(novosEventos);
      localStorage.setItem("eventos", JSON.stringify(novosEventos));
      setNovoEvento({ titulo: "", data: "", localizacao: "", imagem: "" });
      handleCloseModal();
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  const handleEditarEvento = () => {
    if (
      eventoEditando &&
      novoEvento.data &&
      novoEvento.localizacao
    ) {
      const eventosAtualizados = eventos.map((evento) =>
        evento.id === eventoEditando.id ? { ...evento, ...novoEvento } : evento
      );
      setEventos(eventosAtualizados);
      localStorage.setItem("eventos", JSON.stringify(eventosAtualizados));
      handleCloseModal();
    } else {
      alert("Por favor, preencha os campos de data e localização.");
    }
  };

  const handleExcluirEvento = (id) => {
    const eventosAtualizados = eventos.filter((evento) => evento.id !== id);
    setEventos(eventosAtualizados);
    localStorage.setItem("eventos", JSON.stringify(eventosAtualizados));
  };

  return (
    <div className="home-body">
      <div className="home-container">
        <header className="home-header">
          <div className="home-intro">
            <div className="home-subtitle-card">
              <p className="home-subtitle">
                Mantenha seus eventos sempre organizados. Adicione-os ao sistema para planejar sua programação de forma eficiente e garantir que nenhum evento importante seja esquecido.
              </p>
            </div>
            <button className="btn-adicionar" onClick={() => handleOpenModal()}>
              Adicionar Evento
            </button>
          </div>
        </header>

        <div className="eventos-principal-card">
          <h2 className="eventos-titulo">Eventos</h2>
          <div className="eventos-lista">
            {eventos.map((evento) => (
              <div key={evento.id} className="evento-card">
                <img src={evento.imagem} alt={evento.titulo} className="evento-imagem" />
                <div className="evento-detalhes">
                  <h2>{evento.titulo}</h2>
                  <div className="evento-info">
                    <label>Data: </label>
                    <input
                      type="date"
                      value={evento.data}
                      onChange={(e) =>
                        handleEditarEvento(evento.id, "data", e.target.value)
                      }
                    />
                  </div>
                  <div className="evento-info">
                    <label>Localização: </label>
                    <input
                      type="text"
                      value={evento.localizacao}
                      onChange={(e) =>
                        handleEditarEvento(evento.id, "localizacao", e.target.value)
                      }
                    />
                  </div>
                  <button
                    className="btn-editar"
                    onClick={() => handleOpenModal(evento)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-excluir"
                    onClick={() => handleExcluirEvento(evento.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>{eventoEditando ? "Editar Evento" : "Adicionar Evento"}</h2>
              <div className="modal-campo">
                <label>Nome do Evento</label>
                <input
                  type="text"
                  name="titulo"
                  placeholder="Digite o nome do evento"
                  value={novoEvento.titulo}
                  onChange={handleChangeNovoEvento}
                  disabled={eventoEditando ? true : false}
                />
              </div>
              <div className="modal-campo">
                <label>Data</label>
                <input
                  type="date"
                  name="data"
                  value={novoEvento.data}
                  onChange={handleChangeNovoEvento}
                />
              </div>
              <div className="modal-campo">
                <label>Localização</label>
                <input
                  type="text"
                  name="localizacao"
                  placeholder="Digite a localização do evento"
                  value={novoEvento.localizacao}
                  onChange={handleChangeNovoEvento}
                />
              </div>


              {!eventoEditando && (
                <div className="modal-campo">
                  <label>Imagem</label>
                  <input
                    type="text"
                    placeholder="URL da Imagem"
                    name="imagem"
                    value={novoEvento.imagem}
                    onChange={handleChangeNovoEvento}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              )}
              <div className="modal-actions">
                <button
                  className="btn-salvar"
                  onClick={eventoEditando ? handleEditarEvento : handleAdicionarEvento}
                >
                  {eventoEditando ? "Salvar Edição" : "Salvar"}
                </button>
                <button className="btn-cancelar" onClick={handleCloseModal}>
                  Voltar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

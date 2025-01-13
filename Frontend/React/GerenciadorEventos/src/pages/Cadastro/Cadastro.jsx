import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css";
import mostrarImg from "../../assets/mostrar.png";
import ocultarImg from "../../assets/ocultar.png";

export const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const navigate = useNavigate();

  const handleCadastro = (e) => {
    e.preventDefault();

    if (!nome || !email || !senha || !confirmarSenha) {
      setIsValid(false);
      setMensagem("Todos os campos são obrigatórios. Preencha todos.");
      return;
    }

    if (senha !== confirmarSenha) {
      setIsValid(false);
      setMensagem("As senhas não coincidem. Tente novamente.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push({ nome, email, senha });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    setIsValid(true);
    setMensagem("Cadastro realizado com sucesso!");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="cadastro-body">
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={handleCadastro}>
        <h2>Cadastro de Administrador</h2>
        
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <div className="password-container">
            <input
              type={mostrarSenha ? "text" : "password"}
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
            />
            <img
              src={mostrarSenha ? ocultarImg : mostrarImg}
              alt="mostrar/ocultar senha"
              className="show-password-img"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmarSenha">Confirmar Senha</label>
          <div className="password-container">
            <input
              type={mostrarConfirmarSenha ? "text" : "password"}
              id="confirmarSenha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Confirme sua senha"
            />
            <img
              src={mostrarConfirmarSenha ? ocultarImg : mostrarImg}
              alt="mostrar/ocultar confirmar senha"
              className="show-password-img"
              onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
            />
          </div>
        </div>

        {!isValid && <p className="error-message">{mensagem}</p>}
        {isValid && mensagem && <p className="success-message">{mensagem}</p>}

        <div className="form-actions">
          <button type="submit" className="btn-cadastrar">Cadastrar</button>
        </div>
      </form>
    </div>
    </div>
  );
};

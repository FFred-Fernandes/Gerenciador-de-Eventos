import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import mostrarImg from "../../assets/mostrar.png";
import ocultarImg from "../../assets/ocultar.png";
import ligadoImg from "../../assets/ligado.png";
import desligadoImg from "../../assets/desligado.png";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const savedCredentials = JSON.parse(localStorage.getItem("savedCredentials")) || {};
    if (email && savedCredentials[email]) {
      setPassword(savedCredentials[email]);
    } else {
      setPassword("");
    }
  }, [email]);

  const handleLogin = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuarios.find(
      (user) => user.email === email && user.senha === password
    );

    if (usuarioEncontrado) {
      if (rememberMe) {
        const savedCredentials = JSON.parse(localStorage.getItem("savedCredentials")) || {};
        savedCredentials[email] = password;
        localStorage.setItem("savedCredentials", JSON.stringify(savedCredentials));
      }
      localStorage.setItem("loggedIn", true);
      alert("Login efetuado com sucesso!");
      navigate("/home");
    } else {
      setError("Email ou senha incorretos.");
    }
  };

  const handleCadastroRedirect = () => {
    navigate("/cadastro");
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Entrar no Gerenciador de Eventos</h2>

          <div className="cards-container">
            <div className="card">
              <p>Faça a organização de seus eventos</p>
            </div>
            <div className="card">
              <p>Adicione, edite e exclua a qualquer momento</p>
            </div>
            <div className="card">
              <p>Coloque imagens e a localização do evento</p>
            </div>
          </div>

          <div className="login">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
            />
          </div>
          <div className="login">
            <label htmlFor="password">Senha</label>
            <div className="password-container">
              <input
                type={mostrarSenha ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
              />
              <img
                src={mostrarSenha ? ocultarImg : mostrarImg}
                alt="mostrar/ocultar senha"
                className="show-password-img"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
          <div className="salvar">
            <label>
              <img
                src={rememberMe ? ligadoImg : desligadoImg}
                alt="Salvar Senha"
                className="checkbox-img"
                onClick={() => setRememberMe(!rememberMe)}
              />
              Salvar Senha
            </label>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-login">Entrar</button>
            <button
              type="button"
              className="btn-register"
              onClick={handleCadastroRedirect}
            >
              Cadastrar-se
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { fazerLogin, cadastrarUsuario } from "./fazerLogin";
import './index.css'; // Certifique-se de importar o CSS

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState(""); // Novo estado para o tipo de mensagem

  useEffect(() => {
    if (mensagem) {
      const timer = setTimeout(() => {
        setMensagem("");
      }, 5000); // 5000 milissegundos = 5 segundos

      return () => clearTimeout(timer); // Limpa o temporizador se o componente for desmontado ou se a mensagem mudar
    }
  }, [mensagem]);

  const handleLogin = () => {
    fazerLogin(email, senha)
      .then((data) => {
        // Caso o login seja bem-sucedido, você pode redirecionar ou mostrar uma mensagem
        console.log("Login bem-sucedido:", data);
        setMensagem("Login bem-sucedido!");
        setTipoMensagem("sucesso");
      })
      .catch((error) => {
        setMensagem("Erro ao fazer login: " + error);
        setTipoMensagem("erro");
      });
  };

  const handleCadastro = () => {
    cadastrarUsuario(email, senha);
    setMensagem("Usuário cadastrado com sucesso. Agora você pode fazer login.");
    setTipoMensagem("sucesso");
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleCadastro}>Cadastrar</button>
      {mensagem && (
        <p className={`mensagem ${tipoMensagem === "sucesso" ? "mensagem-sucesso" : "mensagem-erro"}`}>
          {mensagem}
        </p>
      )}
    </div>
  );
}
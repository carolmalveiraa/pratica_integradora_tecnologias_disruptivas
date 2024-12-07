import React, { useState } from "react";
// Função para cadastrar um novo usuário e armazenar no localStorage
function cadastrarUsuario(email, senha) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const novoUsuario = { email, senha };
  usuarios.push(novoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  console.log("Usuário cadastrado com sucesso:", novoUsuario);
}

// Função para fazer login verificando os dados no localStorage
function fazerLogin(email, senha) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioEncontrado = usuarios.find(
    (usuario) => usuario.email === email && usuario.senha === senha
  );

  if (usuarioEncontrado) {
    console.log("Login bem-sucedido:", usuarioEncontrado);
    return Promise.resolve(usuarioEncontrado);
  } else {
    console.error("Erro: Usuário não encontrado");
    return Promise.reject("Usuário não encontrado");
  }
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = () => {
    fazerLogin(email, senha)
      .then((data) => {
        // Caso o login seja bem-sucedido, você pode redirecionar ou mostrar uma mensagem
        console.log("Login bem-sucedido:", data);
        setErro(""); // Limpa a mensagem de erro
      })
      .catch((error) => {
        setErro(error);
      });
  };

  const handleCadastro = () => {
    cadastrarUsuario(email, senha);
    setErro("Usuário cadastrado com sucesso. Agora você pode fazer login.");
  };

  return (
    <div>
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
      {erro && <p>{erro}</p>}
    </div>
  );
}
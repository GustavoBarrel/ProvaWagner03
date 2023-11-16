import { useEffect, useState } from 'react';

function App() {
  const [resposta, setresposta] = useState('')

  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    cpf: '',
    cnpj: '',
    senha: '',
  });
  useEffect(() => {

    fetch("http://localhost:3600/feed").then(response => {setresposta(response)})
}, [])
console.log(resposta)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  return (
    <>
      {/* Seus outros elementos JSX aqui */}
      <div className="card">
        <h2>Criar Usuário</h2>
        <form>
          <label>Nome:</label>
          <input type="text" name="nome" value={usuario.nome} onChange={handleChange} />

          <label>Email:</label>
          <input type="email" name="email" value={usuario.email} onChange={handleChange} />

          <label>CPF:</label>
          <input type="text" name="cpf" value={usuario.cpf} onChange={handleChange} />

          <label>CNPJ:</label>
          <input type="text" name="cnpj" value={usuario.cnpj} onChange={handleChange} />

          <label>Senha:</label>
          <input type="password" name="senha" value={usuario.senha} onChange={handleChange} />

          <button type="submit" onClick={useEffect}>
            Criar Usuário
          </button>
        </form>
      </div>
      {/* Seus outros elementos JSX aqui */}
    </>
  );
}

export default App;

import { useState } from 'react';

function App() {
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    cpf: '',
    cnpj: '',
    senha: '',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('localhost:3600/feed', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Erro ao obter dados');
      }

      const data = await response.json();
      console.log('Dados obtidos com sucesso:', data);
    } catch (error) {
      console.error('Erro ao obter dados:', error.message);
    }
  };
  
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

          <button type="button" onClick={handleSubmit}>
            Criar Usuário
          </button>
        </form>
      </div>
      {/* Seus outros elementos JSX aqui */}
    </>
  );
}

export default App;

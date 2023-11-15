import { useState } from 'react';

function App() {
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    cpf: '',
    cnpj: '',
    senha: '',
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3500/feed', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Dados recebidos:', data);
        // Faça o que for necessário com os dados recebidos
      } else {
        console.error('Erro ao fazer a solicitação:', response.status);
      }
    } catch (error) {
      console.error('Erro ao fazer a solicitação:', error);
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

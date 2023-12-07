import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';


function App() {
    const navigate = useNavigate();
    const [resposta, setResposta] = useState([]);
    const [usuario, setUsuario] = useState({
        nome: '',
        email: '',
        cpf: '',
        cnpj: '',
        senha: '',
    });

    async function Logar() {
        const response = await fetch("http://localhost:3600/feed");
        const usuarios = await response.json();

        const usuarioEncontrado = usuarios.find(user => user.email === usuario.email && user.senha === usuario.senha);

        if (usuarioEncontrado.admin === false) {
            navigate('/PaginaPrincipal');
        } else if (usuarioEncontrado.admin === true) {
            navigate('/Dasboard');
        } else {
            console.log("Credenciais inválidas");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        Logar();
    };

    const handleChange = (e) => {
        let nome = e.target.name;
        let valor = e.target.value;
        setUsuario((prev) => {
            return { ...prev, [nome]: valor };
        });
    };

    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '280px', height: '739px' }}>
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap" /></svg>
                    <span className="fs-4">Sidebar</span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <a href="/DashboardCadastro" className="nav-link text-white" aria-current="page">
                            <svg className="bi me-2" width="16" height="16"><use xlinkHref="#home" /></svg>
                            Cadastro Produto
                        </a>
                    </li>
                    <li>
                        <a href="/DashboardListagem" className="nav-link text-white">
                            <svg className="bi me-2" width="16" height="16"><use xlinkHref="#speedometer2" /></svg>
                            Listagem de Usuarios
                        </a>
                    </li>
                    <li>
                        <a href="/DasboardCadastroAdmins" className="nav-link text-white">
                            <svg className="bi me-2" width="16" height="16"><use xlinkHref="#table" /></svg>
                            Cadastro Admins
                        </a>
                    </li>
                    <li>
                        <a href="/DasboardListagemProdutos" className="nav-link text-white">
                            <svg className="bi me-2" width="16" height="16"><use xlinkHref="#grid" /></svg>
                            Lista de produtos

                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-white">
                            <svg className="bi me-2" width="16" height="16"><use xlinkHref="#people-circle" /></svg>
                            Customers
                        </a>
                    </li>
                </ul>
                <hr />
                <div className="dropdown">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                        <strong>mdo</strong>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><a className="dropdown-item" href="#">New project...</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </>
    );

}

export default App;

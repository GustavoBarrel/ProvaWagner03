import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';


function App() {
    const navigate = useNavigate();
    const [resposta, setResposta] = useState([]);
    const [produto, setproduto] = useState({
        titulo: '',
        preco: '',
        descricao: '',
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(produto);
        try {
            const response = await fetch("http://localhost:3600/CadastroUsuarioAdmin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(produto),
            });

            if (!response.ok) {
                // Se a resposta não estiver ok, lançamos um erro para capturar o bloco catch
                throw new Error(`Failed to create user. Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.error('Error creating user:', error);
            // Aqui, você pode decidir o que fazer com o erro, como exibir uma mensagem para o usuário
        }

    };

    const handleChange = (e) => {
        let nome = e.target.name;
        let valor = e.target.value;
        setproduto((prev) => {
            return { ...prev, [nome]: valor };
        });
    };

    return (
        <>
            <div className='d-flex flex-row'>
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


                <div className='w-full'>
                    <div className='flex flex-col justify-center items-center pt-24 '>
                        <h1>Cadastro de Administradores</h1>

                        <form className='w-full max-w-lg border-black rounded-lg py-10 px-10'>
                            <div className='flex flex-wrap -mx-3 mb-6'>
                                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name'>
                                        Primeiro nome
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" name="nome" onChange={handleChange} placeholder="Gustavo" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className='block upp ercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name'>
                                        CPF
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" name="cpf" onChange={handleChange} placeholder="999.999.999-99" />
                                </div>
                            </div>

                            <div className='flex flex-wrap -mx-3 mb-6'>
                                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name'>
                                        Email
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="email" name="email" onChange={handleChange} placeholder="Gustavo@gustavo.com" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className='block upp ercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name'>
                                        Cnpj
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" name="cnpj" onChange={handleChange} placeholder="99.999.999/9999-99" />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                        Password
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" name="senha" onChange={handleChange} placeholder="******************" />
                                    <p className='text-gray-600 text-xs italic'>Faça uma senha forte com numeros e letras.</p>
                                </div>
                            </div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" onClick={handleSubmit}>
                                Button
                            </button>
                        </form>
                    </div>
                </div>
            </div >

        </>
    );

}

export default App;

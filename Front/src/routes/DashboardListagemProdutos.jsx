import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

const ExcluirProduto = async (id) => {
    try {
        const response = await fetch(`http://localhost:3600/ExcluirProduto/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir usuário. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Usuário excluído com sucesso:', data);
    } catch (error) {
        console.error('Erro ao excluir usuário:', error.message);
    }
};

function App() {
    const [produto, setproduto] = useState([]);



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3600/FeedProdutos");
                const data = await response.json();
                setproduto(data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProducts();
    }, []);


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

                <div className="w-full flex flex-col justify-center items-center">
                    <table className="w-3/5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Titulo
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Descricao
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    preco
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Excluir
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Editar
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {produto.map((item) => (

                                <tr key={item.id_produto} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.id_produto}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.titulo}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.descricao}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.valor}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.status.toString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => ExcluirProduto(item.id_produto)}>Excluir</button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button>Editar</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                {/* <div>
                    {produto.map((item) => (
                        <div key={item.id}>
                            <p>{item.nome}</p>
                            <p>{item.email}</p>
                            <p>{item.cpf}</p>
                            <p>{item.cnpj}</p>
                            <p>{item.senha}</p>
                        </div>
                    ))}
                </div> */}
            </div >
        </>
    );

}

export default App;

import { useEffect, useState } from 'react';



function App() {
    const [resposta, setResposta] = useState([]);
    const [usuario, setUsuario] = useState({
        nome: '',
        email: '',
        cpf: '',
        cnpj: '',
        senha: '',
    });

    const getData = async () => {
        try {
            const response = await fetch("http://localhost:3600/feed");
            const parsedResponse = await response.json();
            setResposta(parsedResponse);
            console.log(parsedResponse);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);


    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(usuario);

        try {
            const response = await fetch("http://localhost:3600/CadastroUsuario", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
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
        setUsuario((prev) => {
            return { ...prev, [nome]: valor };
        });
    };
    return (
        <>
            {/* Seus outros elementos JSX aqui */}

            <div className='flex flex-col justify-center items-center pt-48'>
                <form className='w-full max-w-lg border-2 border-black rounded-lg py-10 px-10'>
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
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" onClick={handlesubmit}>
                        Button
                    </button>
                </form>
            </div>
            {/* Seus outros elementos JSX aqui */}
        </>
    );
}

export default App;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({ email: '', senha: '' });

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3600/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);

                // Redirecionar com base no status de admin
                navigate(responseData.redirectUrl);
            } else {
                console.error(`Failed to log in. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
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
        <div className='flex flex-col justify-center items-center pt-48'>
            <form className='w-full max-w-lg border-2 border-black rounded-lg py-10 px-10'>
                <div className='flex flex-wrap -mx-3 mb-6'>
                    <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name'>
                            Email
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="email" name="email" onChange={handleChange} placeholder="Gustavo" />
                    </div>
                    <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name'>
                            Senha
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-password" type="password" name="senha" onChange={handleChange} placeholder="Gustavo" />
                    </div>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginForm;

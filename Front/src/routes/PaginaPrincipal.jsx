import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';


function App() {
    const [produto, setproduto] = useState([]);



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3600/FeedProdutosativos");
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

            <div className='flex flex-row justify-center items-center gap-x-6'>
                {produto.map((item) => (
                    <div key={item.id_produto} className='flex flex-col justify-center items-center w-52 h-52 bg-gray-200 text-center pb-3 mt-6 '>
                        <div className='w-32 h-32'>
                            imagem
                        </div>
                        <div className='self-end align-end'><p className=''>R$:{item.valor}</p></div>
                        <div className='h-12'><p>{item.descricao}</p></div>
                    </div>
                ))}

            </div>

        </>
    );

}

export default App;

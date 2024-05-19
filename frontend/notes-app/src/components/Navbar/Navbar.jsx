// Este é o arquivo onde vai ficar meu componente Navbar
import React from 'react';
// Abaixo é um componente funcional que retorna um h1 com o texto Navbar
const Navbar = () => {
    return (
        <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
            <h2 className='text-xl font-medium text-black py-2'>Notes App</h2>
        </div>
    );
};
// Exporta o componente Navbar
export default Navbar;
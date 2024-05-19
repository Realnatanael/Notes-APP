// Este arquivo é o meu componente PasswordInput
// Importando a biblioteca React para criar o componente PasswordInput
import React from 'react';
// Importando o ícone FaRegEye da biblioteca react-icons
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

// PasswordInput é um componente funcional que retorna um campo de entrada do tipo password
// Ele recebe três props: value, onChange e placeholder
const PasswordInput = ({ value, onChange, placeholder }) => {
    // isShowPassword é um estado que controla a visibilidade da senha no campo de entrada
    // Inicialmente, é definido como false, o que significa que a senha estará oculta
    const [isShowPassword, setIsShowPassword] = React.useState(false);

    // toggleShowPassword é uma função que alterna o valor de isShowPassword
    // Se isShowPassword for true, ele se tornará false, e vice-versa
    // Isso permite que o usuário mostre e oculte a senha
    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    // O componente retorna um div que contém um campo de entrada e um botão
    // O campo de entrada exibe a senha se isShowPassword for true, e a oculta se for false
    // O botão, quando clicado, chama a função toggleShowPassword para mostrar ou ocultar a senha
    return (
        <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
            <input
            value={value}
            onChange={onChange}
            type={isShowPassword ? 'text' : 'password'}
            placeholder={placeholder || 'Password'}
            className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
            style={{'::-ms-reveal': {display: 'none'}, '::-webkit-reveal': {display: 'none'}}}
            />

            {isShowPassword ? <FaRegEye
                size={22}
                className='text-primary-200 cursor-pointer'
                onClick={() => toggleShowPassword()}
            /> : <FaRegEyeSlash
                size={22}
                className='text-primary-200 cursor-pointer'
                onClick={() => toggleShowPassword()}
            />
            }
        </div>
    );
};

// O componente PasswordInput é exportado para que possa ser usado em outros arquivos
export default PasswordInput;
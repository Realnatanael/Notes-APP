// Este arquivo é onde a page SignUp é definido.
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
// Abaixo é um componente funcional que retorna um h1 com o texto SignUp
const SignUp = () => {
    // name é um estado que armazena o nome digitado pelo usuário
    const [name, setName] = useState('');
    // email é um estado que armazena o email digitado pelo usuário
    const [email, setEmail] = useState('');
    // password é um estado que armazena a senha digitada pelo usuário
    const [password, setPassword] = useState('');
    // error é um estado que armazena uma mensagem de erro, caso ocorra
    const [error, setError] = useState(null);
    // handleSignUp é uma função que é chamada quando o formulário é submetido 
    const handleSignUp = (e) => { // e é o evento que ocorre quando o formulário é submetido 
        e.preventDefault(); // previne o comportamento padrão do formulário de ser submetido
        // Verifica se o nome tem menos de 3 caracteres se sim exibe uma mensagem de erro
        if (name.length < 3) { 
            setError('O nome deve ter pelo menos 3 caracteres');
            return; 
        }
        // Verifica se o email é válido através da função validateEmail 
        if (!validateEmail(email)) {
            setError('Coloque um email válido!');
            return;
        }
        // Verifica se a senha é válida e tem mais de 6 caracteres
        if (password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres');
            return;
        }
        // Se o nome, email e senha forem válidos, o estado de erro é limpo
        setError("");
    };
    // O componente retorna um formulário com campos de entrada para nome, email e senha
    return (
        <>
            <Navbar />

            <div className='flex items-center justify-center mt-28'>
                <div className='w-96 border rounded bg-white px-7 py-10'>
                    <form onSubmit={handleSignUp}>
                        <h4 className='text-2xl mb-7 text-'>Cadastre-se</h4>

                        <input
                            type="text"
                            placeholder='Nome'
                            className='input-box'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder='Email'
                            className='input-box'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
                        <button type='submit' className='btn-primary'>Cadastrar</button>

                        <p className='text-sm text-center mt-4'>
                            Já tem uma conta? {" "}
                            <Link to="/" className='font-medium text-primary-200 underline hover:text-primary-300'>
                                Faça login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};
// Exporta o componente SignUp
export default SignUp;
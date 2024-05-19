// Este arquivo é onde a page Login é definido.
import React, {useState} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
// Abaixo é um componente funcional que retorna um h1 com o texto Login
const Login = () => {
    // email é um estado que armazena o email digitado pelo usuário
    const [email, setEmail] = useState('');
    // password é um estado que armazena a senha digitada pelo usuário
    const [password, setPassword] = useState('');
    // error é um estado que armazena uma mensagem de erro, caso ocorra
    const [error, setError] = useState(null);
    // handleLogin é uma função que é chamada quando o formulário é submetido
    const handleLogin = async (e) => {
        e.preventDefault();
        // Se o email ou a senha estiverem vazios, exibe uma mensagem de erro
        if (!email || !password) {
            setError('Email e senha são obrigatórios');
            return;
        }
        // Se não houver erro, limpa a mensagem de erro
        setError(null);
        // Cria um objeto com o email e a senha
        const user = {email, password};
        // Envia o objeto para a API
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        // Converte a resposta em JSON
        const data = await response.json();
        // Se a resposta contiver um token, armazena o token no localStorage
        if (data.token) {
            localStorage.setItem('token', data.token);
            // Redireciona o usuário para a página de dashboard
            window.location.href = '/dashboard';
        } else {
            // Se a resposta não contiver um token, exibe uma mensagem de erro
            setError(data.message);
        }
    };
    // O componente retorna um formulário com campos de entrada para email e senha
    return (
        <>
            <Navbar />

            <div className='flex items-center justify-center mt-28'>
                <div className='w-96 border rounded bg-white px-7 py-10'>
                    <form onSubmit={handleLogin}>
                        <h4 className='text-2xl mb-7 text-'>Login</h4>

                        <input 
                        type="text" 
                        placeholder='Email' 
                        className='input-box' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />

                        <PasswordInput value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />

                        <button type='submit' className='btn-primary'>Login</button>

                        <p className='text-sm text-center mt-4'>
                            Não tem uma conta? {" "}
                            <Link to="/signup" className='font-medium text-primary-200 underline hover:text-primary-300'>
                                Criar uma conta
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};
// Exporta o componente Login
export default Login;
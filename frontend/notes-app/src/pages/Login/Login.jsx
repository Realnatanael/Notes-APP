// Este arquivo é onde a page Login é definido.
import React, {useState} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';
// Abaixo é um componente funcional que retorna um h1 com o texto Login
const Login = () => {
    // email é um estado que armazena o email digitado pelo usuário
    const [email, setEmail] = useState('');
    // password é um estado que armazena a senha digitada pelo usuário
    const [password, setPassword] = useState('');
    // error é um estado que armazena uma mensagem de erro, caso ocorra
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    // handleLogin é uma função que é chamada quando o formulário é submetido
    const handleLogin = async (e) => {
        e.preventDefault();
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
        // Se o email e a senha forem válidos, o estado de erro é limpo
        setError("")

        // chamando a API de login
        try{
            const response = await axiosInstance.post("/login", {
                email,
                password,
            });

            // Se a resposta da API tiver um token de acesso, ele é armazenado no localStorage
            if (response.data && response.data.accessToken){
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            } else {
                setError("Algo deu errado. Tente novamente mais tarde.");
            }
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

                        {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

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
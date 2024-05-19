// Importando as bibliotecas e componentes necessários
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SingUp';
import Login from './pages/Login/Login';

// Definindo as rotas da aplicação utilizando o componente Route do react-router-dom
// Cada rota é associada a um componente específico que será renderizado quando a rota for acessada
const  routes = (
    <Router>
        <Routes> 
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
        </Routes>
    </Router>
);

// Definindo o componente App
// Este componente renderiza as rotas definidas acima
const App = () => {
    // Inserindo rotas dentro do componente App
    return (
        <div>
            {routes}
        </div>
    );
}

// Exportando o componente App para que possa ser utilizado em outros arquivos
export default App;
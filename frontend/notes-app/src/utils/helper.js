// função que valida o email fazendo uso de expressões regulares (regex)
export const validateEmail = (email) => {
    // A função abaixo valida se o email é válido
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
};
// função que valida a senha fazendo uso de expressões regulares (regex)
export const getInitials = (name) => {
    if (!name) return "";
    // A função abaixo retorna as iniciais do nome do usuário
    const words = name.split(" ");
    let initials = "";
    // O for abaixo pega as duas primeiras letras do nome e retorna em maiúsculo 
    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase();
}

// Regex é uma sequência de caracteres que define um padrão de busca, muito utilizado para validação de strings
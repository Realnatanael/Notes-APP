// função que valida o email fazendo uso de expressões regulares (regex)
export const validateEmail = (email) => {
    // A função abaixo valida se o email é válido
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
};


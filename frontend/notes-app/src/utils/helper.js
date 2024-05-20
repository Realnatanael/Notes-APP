// função que valida o email fazendo uso de expressões regulares (regex)
export const validateEmail = (email) => {
    // A função abaixo valida se o email é válido
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
};

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";
    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase();
}
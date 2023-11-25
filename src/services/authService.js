const User = require('../models/user');
const usersDB = require('../db/usersDB');
const generateJWT = require('../utils/generateJWT');
const secretKey = require('../utils/secretKey');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const signup = (req, res) => {
    const { nome, email, senha, telefones } = req.body;

    if (usersDB.some(user => user.email === email)) {
        return res.status(400).json({ mensagem: 'E-mail já existente' });
    }

    const key = jwt.sign({ id: uuidv4() }, secretKey, { expiresIn: 1800 });

    const newUser = {
        id: uuidv4(),
        nome,
        email,
        telefones,
        senha,
        data_criacao: new Date(),
        data_atualizacao: new Date(),
        ultimo_login: null,
        token: key,
    };

    usersDB.push(newUser);

    return res.status(201).json({
        id: newUser.id,
        data_criacao: newUser.data_criacao,
        data_atualizacao: newUser.data_atualizacao,
        ultimo_login: newUser.ultimo_login,
        token: newUser.token,
    });
};

const signin = (req, res) => {
    const { email, senha } = req.body;

    const user = usersDB.find(u => u.email === email && u.senha === senha);

    if (!user) {
        return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
    }

    user.data_atualizacao = new Date();
    user.ultimo_login = new Date();

    return res.json({
        id: user.id,
        data_criacao: user.data_criacao,
        data_atualizacao: user.data_atualizacao,
        ultimo_login: user.ultimo_login,
        token: user.token,
    });
};

module.exports = { signup, signin };
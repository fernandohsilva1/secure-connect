const jwt = require('jsonwebtoken');
const secretKey = require('../utils/secretKey');
const usersDB = require('../db/usersDB');

const getUser = (req, res) => {
    const { email } = req.params;
    const token = req.headers.authorization;

    const user = usersDB.find(u => u.email === email);

    if (!user) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensagem: 'Token inválido' });
        }

        if (token !== user.token) {
            return res.status(401).json({ mensagem: 'Não autorizado' });
        }

        return res.json({
            id: user.id,
            nome: user.nome,
            email: user.email,
            telefones: user.telefones,
            data_criacao: user.data_criacao,
            data_atualizacao: user.data_atualizacao,
            ultimo_login: user.ultimo_login,
            token: user.token,
        });
    });
};

module.exports = { getUser };
const generateGUID = require('../utils/generateGUID');

class User {
    constructor(nome, email, senha, telefones) {
        this.id = generateGUID();
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefones = telefones;
        this.data_criacao = new Date();
        this.data_atualizacao = new Date();
        this.ultimo_login = null;
        this.token = null;
    }
}

module.exports = User;

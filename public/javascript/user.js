class Person {
    constructor(data) {
        this.nome = data.nome
        this.sobrenome = data.sobrenome
        this.telefone = data.telefone
        this.email = data.email
        this.senha = data.senha
        this.sexo = data.sexo
        this.newsletter = data.newsletter == "on" ? 1 : 0
    }
}

module.exports = Person
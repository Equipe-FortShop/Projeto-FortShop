class User {
    constructor(data) {
        this.email = data.email
        this.senha = data.password
        this.senhaConfirmada = data.confirm_password
    }
}

module.exports = User
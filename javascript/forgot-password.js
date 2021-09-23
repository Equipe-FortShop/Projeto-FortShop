(function () {
    function getEmail() {
        var dados = JSON.stringify({
            email    : document.querySelector("input[name=email]").value
        });
        /* 
        //TODO: Busca do e-mail no banco de dados e enviar como recuperar o e-mail
        
        
        */
        localStorage.setItem("email-recover", JSON.stringify(dados));
        return true;
    }
    var form = document.querySelector("form");
    form.addEventListener("submit", function () {
        // event.preventDefault(); event
        return getEmail();
    });
})();
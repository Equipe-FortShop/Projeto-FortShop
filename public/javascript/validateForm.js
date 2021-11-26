function validarCriarUsuario() {
  var email = document.getElementById("email");
  var senha = document.getElementById("password");
  var confirmarSenha = document.getElementById("confirm_password");
  var formulario = document.getElementById("formularioRegistro");
  var campos = new Array(
    email,
    senha,
    confirmarSenha
  );

  var dict = [
    "Email",
    "Senha",
    "Confirmar Senha"
  ];

  var i = 0;
  var error = false;
  var camposErrados = new Array();
  campos.forEach((campo) => {
    if (campo.value == "") {
      error = true;
      camposErrados.push(dict[i]);
      campo.focus();
    }
    i += 1;
  });

  var qtdCamposErrados = camposErrados.length;
  var nomesCampos = "";
  for (let index = 0; index < qtdCamposErrados; index++) {
    if (index != 0 && index != qtdCamposErrados - 1) {
      nomesCampos += `, ${camposErrados[index]}`;
    } else if (index == 0) {
      nomesCampos = `${camposErrados[index]}`;
    } else {
      nomesCampos += ` e ${camposErrados[index]}`;
    }
  }
  if (error) {
    if (qtdCamposErrados > 1) {
      alert(`${nomesCampos} não informados`);
    } else {
      alert(`${nomesCampos} não informado`);
    }
  } else {
    formulario.submit();
  }
}

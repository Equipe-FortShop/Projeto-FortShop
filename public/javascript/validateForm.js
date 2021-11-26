exports.isUserValid = function isUserValid(email, senha, confirmarSenha) {
  var campos = new Array(email, senha, confirmarSenha);

  var dict = ["Email", "Password", "Confirm Password"];

  var i = 0;
  var error = false;
  var camposErrados = new Array();
  campos.forEach((campo) => {
    if (campo == "") {
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

  if (senha != confirmarSenha) {
    return "The passwords has to match";
  } else if (error) {
    var text = "";
    if (qtdCamposErrados > 1) {
      text = `${nomesCampos} are empty`;
    } else {
      text = `${nomesCampos} is empty`;
    }
    return text;
  } else {
    return true;
  }
};

exports.isLoginValid = function isLoginValid(email, senha) {
  var campos = new Array(email, senha);

  var dict = ["Email", "Password"];

  var i = 0;
  var error = false;
  var camposErrados = new Array();
  campos.forEach((campo) => {
    if (campo == "") {
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
    var text = "";
    if (qtdCamposErrados > 1) {
      text = `${nomesCampos} are empty`;
    } else {
      text = `${nomesCampos} is empty`;
    }
    return text;
  } else {
    return true
  }

}

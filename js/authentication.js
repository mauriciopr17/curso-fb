//buttons
var authEmailPassButton = document.getElementById("authEmailPassButton");
var authFacebookButton = document.getElementById("authFacebookButton");

var authTwitterButton = document.getElementById("authTwitterButton");

var authGoogleButton = document.getElementById("authGoogleButton");

var authGitHubButton = document.getElementById("authGitHubButton");

var authAnonymouslyButton = document.getElementById("authAnonymouslyButton");

var createUserButton = document.getElementById("createUserButton");

var logOutButton = document.getElementById("logOutButton");

//inputs
var emailInput = document.getElementById("emailInput");
var passwordInput = document.getElementById("passwordInput");

//displays
var displayName = document.getElementById("displayName");

//Criar novo Usuário
createUserButton.addEventListener("click", function () {
  firebase
    .auth()
    .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(function () {
      alert("Bem vindo " + emailInput.value);
    })
    .catch(function (error) {
      console.error(error.code);
      console.error(error.message);
      alert("Falha ao cadastrar, verifique o erro no console.");
    });
});

//Autenticar com e-mail e senha
authEmailPassButton.addEventListener("click", function () {
  firebase
    .auth()
    .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(function (result) {
      console.log(result);
      displayName.innerText = "Bem vindo, " + emailInput.value;
      alert("Autenticado " + emailInput.value);
    })
    .catch(function (error) {
      console.error(error.code);
      console.error(error.message);
      alert("Falha ao autenticar, verifique o erro no console.");
    });
});

//Autenticação anônima
authAnonymouslyButton.addEventListener("click", function () {
  firebase
    .auth()
    .signInAnonymously()
    .then(function (result) {
      console.log(result);
      displayName.innerText = "Bem vindo, desconhecido.";
      alert("Autenticado anonimamente.");
    })
    .catch(function (error) {
      console.error(error.code);
      console.error(error.message);
      alert("Falha ao autenticar, verifique o erro no console.");
    });
});

//Autenticar com GitHub
authGitHubButton.addEventListener("click", function () {
  var provider = new firebase.auth.GithubAuthProvider();
  signIn(provider);
});

//Autenticar com Google
authGoogleButton.addEventListener("click", function () {
  var provider = new firebase.auth.GoogleAuthProvider();
  signIn(provider);
});

//Logout
logOutButton.addEventListener("click", function () {
  firebase
    .auth()
    .signOut()
    .then(function () {
      displayName.innerText = "Você não está autenticado";
      alert("Você deslogou.");
    })
    .catch(function (error) {
      console.error(error);
    });
});

//função signIn para fazer o login
function signIn(provider) {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      console.log("result " + result);
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      displayName.innerText = "Bem vindo, " + user;
      // ...
    })
    .catch(function (error) {
      console.log(error);
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      alert("Falha de autenticação.");
    });
}

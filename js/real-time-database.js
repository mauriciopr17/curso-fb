var usersList = document.getElementById("usersList");
//jquery $("#nameInput");
var nameInput = document.getElementById("nameInput");
var ageInput = document.getElementById("ageInput");
var addButton = document.getElementById("addButton");

//ao clicar no botão
addButton.addEventListener("click", function () {
  create(nameInput.value, ageInput.value);
});

function create(name, age) {
  var data = {
    name: name,
    age: age,
  };

  return firebase.database().ref().child("users").push(data);
}

//toda vez que tirar alteração no banco (table users)
firebase
  .database()
  .ref("users")
  .on("value", function (snapshot) {
    usersList.innerHTML = "";

    snapshot.forEach(function (item) {
      console.log("---------------- " + item.val().name);
      var li = document.createElement("li");
      li.appendChild(
        document.createTextNode(item.val().name + " : " + item.val().age)
      );
      usersList.appendChild(li);
    });
  });

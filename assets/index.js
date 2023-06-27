// Insertion de donnees dans la base de donnees

const idInput = document.querySelector("#id_user");
const nameInput = document.querySelector("#nom");
const lastnameInput = document.querySelector("#prenoms");
const jobInput = document.querySelector("#profession");

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  let data = {
    id_user: idInput.value,
    nom: nameInput.value,
    prenoms: lastnameInput.value,
    profession: jobInput.value,
  };

  if (document.querySelector("#btnAddOrChange").textContent === "Soumettre") {
    Utilisateurs.insertUser(data, function (erreur) {
      alert(erreur);
    });

    idInput.value = "";
    nameInput.value = "";
    lastnameInput.value = "";
    jobInput.value = "";

    document.querySelector("table tbody").innerHTML = "";
    showData();
  } else {
    Utilisateurs.updateUser(data, function () {
      idInput.value = "";
      nameInput.value = "";
      lastnameInput.value = "";
      jobInput.value = "";
      if (document.querySelector("#btnAddOrChange").textContent === "Modifier")
        document.querySelector("#btnAddOrChange").textContent = "Soumettre";
      document.querySelector("table tbody").innerHTML = "";
      document.querySelector("#id_user").removeAttribute("readonly");
      showData();
    });
  }
});

// // Affichage des donnees sur le DOM

function showData() {
  let recupData = Utilisateurs.allData();

  let body = document.querySelector("table tbody");

  recupData.forEach((utilisateur) => {
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-danger");
    deleteBtn.classList.add("testStyle");
    deleteBtn.textContent = "Supprimer";

    deleteBtn.addEventListener("click", (e) => {
      Utilisateurs.deleteUser(utilisateur.id_user, function (erreur) {
        console.log(erreur);
      });
      document.querySelector("table tbody").innerHTML = "";
      showData();
    });

    let upadteBtn = document.createElement("button");
    upadteBtn.classList.add("btn");
    upadteBtn.classList.add("btn-primary");
    upadteBtn.classList.add("testStyle");
    upadteBtn.textContent = "Modifier";

    upadteBtn.addEventListener("click", (e) => {
      Utilisateurs.oneUser(utilisateur.id_user, function (dataUser) {
        document.querySelector("#id_user").setAttribute("readonly", true);
        idInput.value = dataUser.id_user;
        nameInput.value = dataUser.nom;
        lastnameInput.value = dataUser.prenoms;
        jobInput.value = dataUser.profession;
        if (
          document.querySelector("#btnAddOrChange").textContent === "Soumettre"
        )
          document.querySelector("#btnAddOrChange").textContent = "Modifier";
      });
    });

    let ligne = body.insertRow();

    let cellule1 = ligne.insertCell();
    cellule1.textContent = utilisateur.id_user;

    let cellule2 = ligne.insertCell();
    cellule2.textContent = utilisateur.nom;

    let cellule3 = ligne.insertCell();
    cellule3.textContent = utilisateur.prenoms;

    let cellule4 = ligne.insertCell();
    cellule4.textContent = utilisateur.profession;

    let cellule5 = ligne.insertCell();
    cellule5.appendChild(upadteBtn);

    let cellule6 = ligne.insertCell();
    cellule6.appendChild(deleteBtn);
  });
}

showData();

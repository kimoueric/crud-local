class Utilisateurs {
  /**
   *
   * @param {object} objet
   * @param {void} cb
   */
  static insertUser(objet, cb) {
    if (!localStorage.getItem(objet.id_user)) {
      localStorage.setItem(objet.id_user, JSON.stringify(objet));
    } else {
      let erreur = "Desole il y'a un utilisateur enregistre avec cet id";
      cb(erreur);
    }
  }
  /**
   *
   * @param {string} id
   * @param {void} cb
   */

  static deleteUser(id, cb) {
    if (localStorage.getItem(id)) localStorage.removeItem(id);
    else {
      let erreur = "Desole cet utilisateur n'existe pas !!!";
      cb(erreur);
    }
  }
/**
 * 
 * @param {object} objet 
 * @param {void} cb 
 */
  static updateUser(objet, cb) {
    
    const { id_user} = objet
   
    if (localStorage.getItem(id_user)) {
      localStorage.setItem(id_user, JSON.stringify(objet));
    }
    cb()
  
  }

  static allData() {
    let dataTable = [];
    for (let index = 0; index < localStorage.length; index++) {

      dataTable.push(JSON.parse(localStorage.getItem(localStorage.key(index))));
    }
    console.log(dataTable);
    return dataTable;
  }

  /**
   * 
   * @param {string} id 
   * @param {void} cb 
   */
  static oneUser(id, cb) {
    let dataUser;
    if (localStorage.getItem(id))
      dataUser = JSON.parse(localStorage.getItem(id));
   
    cb(dataUser);
  }
}

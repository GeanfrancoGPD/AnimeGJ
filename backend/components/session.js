class Session {
  constructor(DBComponent) {
    this.DBComponent = DBComponent;
  }

  async createSession(sessionObject, user) {
    console.log("Creando sesión para usuario:", user[0].gmail);

    sessionObject.request.session.user = {
      id: user[0].id,
      gmail: user[0].gmail,
      nombre: user[0].nombre,
    };

    console.log("Sesión creada:", sessionObject.request.session.user);
    console.log("Session ID:", sessionObject.request.sessionID);

    sessionObject.response.json({
      success: true,
      message: "Se ha iniciado sesion correctamente",
      user: sessionObject.request.session.user,
    });
  }

  sessionExist(sessionObject) {
    const user = sessionObject.request.session.user;

    if (user) {
      console.log("Usuario en sesión:", user);
      return user; // Devuelve el objeto del usuario
    } else {
      console.log("No hay usuario en la sesión");
      return null; // Devuelve null si no hay nada
    }
  }

  destroySession(sessionObject) {
    sessionObject.request.session.destroy((error) => {
      if (error) {
        sessionObject.response.status(500).json({
          success: false,
          message: "Error al cerrar sesión",
        });
      }

      sessionObject.response.json({
        success: true,
        message: "Sesión cerrada exitosamente",
      });
    });
  }
}

export default new Session();

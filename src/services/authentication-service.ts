// export default class AuthentificationService {
//   static isAuthenticated: boolean = false;

//   static login(username: string, password: string): Promise<boolean> {
//     const isAuthenticated = username === "pikachu" && password === "pikachu";

//     return new Promise((resolve) => {
//       setTimeout(() => {
//         this.isAuthenticated = isAuthenticated;
//         resolve(isAuthenticated);
//       }, 1000);
//     });
//   }
// }

export default class AuthenticationService {
  static isAuthenticated: boolean = false;

  static login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Vérifiez l'authentification
      const isUserAuthenticated = username === "pikachu" && password === "pikachu";

      if (!isUserAuthenticated) {
        throw new Error("Nom d'utilisateur ou mot de passe incorrect");
      }

      // Simulez un délai de traitement asynchrone
      await new Promise((resolve) => setTimeout(resolve, 1000));

      AuthenticationService.isAuthenticated = isUserAuthenticated;
      return isUserAuthenticated;
    } catch (error: any) {
      // Gérez l'erreur et renvoyez un message d'erreur approprié
      console.error("Erreur d'authentification :", error.message);
      throw error;
    }
  };
}



import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthenticationService from './services/authentication-service';

const PrivateRoute = () => {
  // Vérifie si l'utilisateur est authentifié en utilisant AuthenticationService.isAuthenticated
  const isAuthenticated = AuthenticationService.isAuthenticated;

  // Si l'utilisateur est authentifié, affiche le contenu de la route protégée
  // Sinon, redirige l'utilisateur vers la page de connexion ("/login")
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;






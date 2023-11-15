import React, { FunctionComponent } from "react";
// import PokemonList from "./pages/pokemon-list";
import { Outlet } from "react-router-dom";

const App: FunctionComponent = () => {

  return (
    <Outlet />
  );
};

export default App;

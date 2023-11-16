import React, { FunctionComponent, useState, useEffect } from "react";
import Pokemon from "../models/pokemon";
// import POKEMONS from "../models/mock-pokemon";
import PokemonCard from "../components/pokemon-card";
import PokemonService from "../services/pokemon-service";
import { Link } from "react-router-dom";
import PokemonSearch from "../components/pokemon-search";

const PokemonList: FunctionComponent = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    // setPokemons(POKEMONS);
    // PokemonService.getPokemons().then(pokemons => setPokemons(pokemons))
    const fetchPokemons = async () => {
      try {
        const pokemonsData = await PokemonService.getPokemons();
        setPokemons(pokemonsData);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    };

    fetchPokemons();
  }, []); // Le tableau de dépendances est vide pour s'assurer que cela ne s'exécute qu'une seule fois

  return (
    <div>
      <h1 className="center">Pokédex</h1>
      <div className="container">
        <div className="row">
          <PokemonSearch />
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
        <Link
          to="/pokemon/add"
          className="btn-floating btn-large waves-effect waves-light red z-depth-3"
          style={{ position: "fixed", bottom: "25px", right: "25px" }}
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default PokemonList;

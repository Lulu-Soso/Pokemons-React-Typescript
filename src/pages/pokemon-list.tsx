import React, { FunctionComponent, useState, useEffect } from "react";
import Pokemon from "../models/pokemon";
// import POKEMONS from "../models/mock-pokemon";
import PokemonCard from "../components/pokemon-card";
import PokemonService from "../services/pokemon-service";

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
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonList;

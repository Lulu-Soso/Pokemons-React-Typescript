import React, { FunctionComponent, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PokemonForm from '../components/pokemon-form';
import Pokemon from '../models/pokemon';
// import POKEMONS from '../models/mock-pokemon';
import PokemonService from '../services/pokemon-service';
 
type ParamsId = { id: string };
  
const PokemonEdit: FunctionComponent = () => {

    const { id } = useParams<ParamsId>(); // Utilisation de useParams pour obtenir le paramètre 'id'
    
  const [pokemon, setPokemon] = useState<Pokemon|null>(null);
  
//   useEffect(() => {
//     POKEMONS.forEach(pokemon => {
//       if (id === pokemon.id.toString()) {
//         setPokemon(pokemon);
//       }
//     })
//   }, [id]);

useEffect(() => {
    const fetchPokemon = async () => {
      if (id !== undefined) { // Vérifiez si id est défini
        try {
          const pokemonData = await PokemonService.getPokemon(+id); // pour convertir la chaîne id en un nombre
          setPokemon(pokemonData);
        } catch (error) {
          console.error("Error fetching pokemon:", error);
        }
      }
    };
  
    fetchPokemon();
  }, [id]);
    
  return (
    <div>
      { pokemon ? (
        <div className="row">
            <h2 className="header center">Éditer { pokemon.name }</h2>
            <PokemonForm pokemon={pokemon} isEditForm={true}></PokemonForm>
        </div>
      ) : (
        <h4 className="center">Aucun pokémon à afficher !</h4>
      )}
    </div>
  );
}
  
export default PokemonEdit;
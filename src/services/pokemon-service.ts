/* Version de PRODUCTION */
// import Pokemon from "../models/pokemon";
// import POKEMONS from "../models/mock-pokemon";
  
// export default class PokemonService {
  
//   static pokemons:Pokemon[] = POKEMONS;
  
//   static isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
  
//   static getPokemons(): Promise<Pokemon[]> {
//     if(this.isDev) {
//       return fetch('http://localhost:3001/pokemons')
//       .then(response => response.json())
//       .catch(error => this.handleError(error));
//     }
  
//     return new Promise(resolve => {
//       resolve(this.pokemons);
//     });
//   }
  
//   static getPokemon(id: number): Promise<Pokemon|null> {
//     if(this.isDev) {
//       return fetch(`http://localhost:3001/pokemons/${id}`)
//       .then(response => response.json())
//       .then(data => this.isEmpty(data) ? null : data)
//       .catch(error => this.handleError(error));
//     }
  
//     return new Promise(resolve => {    
//       resolve(this.pokemons.find(pokemon => id === pokemon.id));
//     }); 
//   }
  
//   static updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
//     if(this.isDev) {
//       return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
//         method: 'PUT',
//         body: JSON.stringify(pokemon),
//         headers: { 'Content-Type': 'application/json'}
//       })
//       .then(response => response.json())
//       .catch(error => this.handleError(error));
//     }
  
//     return new Promise(resolve => {
//       const { id } = pokemon;
//       const index = this.pokemons.findIndex(pokemon => pokemon.id === id);
//       this.pokemons[index] = pokemon;
//       resolve(pokemon);
//     }); 
//   }
  
//   static deletePokemon(pokemon: Pokemon): Promise<{}> {
//     if(this.isDev) {
//       return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json'}
//       })
//       .then(response => response.json())
//       .catch(error => this.handleError(error));
//     }
  
//     return new Promise(resolve => {    
//       const { id } = pokemon;
//       this.pokemons = this.pokemons.filter(pokemon => pokemon.id !== id);
//       resolve({});
//     }); 
//   }
  
//   static addPokemon(pokemon: Pokemon): Promise<Pokemon> {
//     pokemon.created = new Date(pokemon.created);
  
//     if(this.isDev) {
//       return fetch(`http://localhost:3001/pokemons`, {
//         method: 'POST',
//         body: JSON.stringify(pokemon),
//         headers: { 'Content-Type': 'application/json'}
//       })
//       .then(response => response.json())
//       .catch(error => this.handleError(error));
//     }
  
//     return new Promise(resolve => {    
//       this.pokemons.push(pokemon);
//       resolve(pokemon);
//     }); 
//   }
  
//   static searchPokemon(term: string): Promise<Pokemon[]> {
//     if(this.isDev) {
//       return fetch(`http://localhost:3001/pokemons?q=${term}`)
//       .then(response => response.json())
//       .catch(error => this.handleError(error));
//     }
  
//     return new Promise(resolve => {    
//       const results = this.pokemons.filter(pokemon => pokemon.name.includes(term));
//       resolve(results);
//     });
  
//   }
  
//   static isEmpty(data: Object): boolean {
//     return Object.keys(data).length === 0;
//   }
  
//   static handleError(error: Error): void {
//     console.error(error);
//   }
// }

import Pokemon from "../models/pokemon";
import POKEMONS from "../models/mock-pokemon";

export default class PokemonService {
  static pokemons: Pokemon[] = POKEMONS;
  static isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

  static async getPokemons(): Promise<Pokemon[]> {
    try {
      if (this.isDev) {
        const response = await fetch("http://localhost:5000/pokemons");
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      }
      return this.pokemons; // Utilisation des données en mémoire en mode production
    } catch (error) {
      console.error("Error fetching Pokemons:", error);
      throw error;
    }
  }

  static async getPokemon(id: number): Promise<Pokemon | null> {
    try {
      if (this.isDev) {
        const response = await fetch(`http://localhost:5000/pokemons/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        return this.isEmpty(data) ? null : data;
      }
      return this.pokemons.find(pokemon => pokemon.id === id) || null; // Recherche en mémoire en mode production
    } catch (error) {
      console.error(`Error fetching Pokemon with ID ${id}:`, error);
      throw error;
    }
  }

  static async updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    try {
      if (this.isDev) {
        const response = await fetch(
          `http://localhost:5000/pokemons/${pokemon.id}`,
          {
            method: "PUT",
            body: JSON.stringify(pokemon),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        return await response.json();
      }
      // Mettre à jour en mémoire en mode production
      const index = this.pokemons.findIndex(p => p.id === pokemon.id);
      if (index !== -1) {
        this.pokemons[index] = pokemon;
      }
      return pokemon;
    } catch (error) {
      console.error("Error updating Pokemon:", error);
      throw error;
    }
  }

  static async deletePokemon(pokemon: Pokemon): Promise<{}> {
    try {
      if (this.isDev) {
        const response = await fetch(
          `http://localhost:5000/pokemons/${pokemon.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
      }
      // Supprimer en mémoire en mode production
      this.pokemons = this.pokemons.filter(p => p.id !== pokemon.id);
      return {};
    } catch (error) {
      console.error("Error deleting Pokemon:", error);
      throw error;
    }
  }

  static async addPokemon(pokemon: Pokemon): Promise<Pokemon> {
    try {
      if (this.isDev) {
        const response = await fetch(`http://localhost:5000/pokemons/`, {
          method: "POST",
          body: JSON.stringify(pokemon),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const addedPokemon = await response.json();
        return addedPokemon;
      }
      // Ajouter en mémoire en mode production
      const newPokemon = { ...pokemon, id: this.getNextId() };
      this.pokemons.push(newPokemon);
      return newPokemon;
    } catch (error) {
      console.error("Error adding Pokemon:", error);
      throw error;
    }
  }

  static async searchPokemon(term: string): Promise<Pokemon[]> {
    try {
      if (this.isDev) {
        const response = await fetch(`http://localhost:5000/pokemons?q=${term}`);
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      }
      // Recherche en mémoire en mode production
      return this.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(term.toLowerCase())
      );
    } catch (error) {
      console.error("Error searching for Pokemon:", error);
      throw error;
    }
  }

  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  static handleError(error: Error): void {
    console.error(error);
  }

  static getNextId(): number {
    const maxId = Math.max(...this.pokemons.map(pokemon => pokemon.id));
    return maxId + 1;
  }
}


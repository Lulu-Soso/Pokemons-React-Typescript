// import Pokemon from "../models/pokemon";

// export default class PokemonService {
//   static getPokemons(): Promise<Pokemon[]> {
//     return fetch("http://localhost:5000/pokemons")
//       .then((response) => response.json())
//       .catch((error) => this.handleError(error));
//   }

//   static getPokemon(id: number): Promise<Pokemon | null> {
//     return fetch(`http://localhost:5000/pokemons/${id}`)
//       .then((response) => response.json())
//       .then((data) => (this.isEmpty(data) ? null : data))
//       .catch((error) => this.handleError(error));
//   }

//   static updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
//     return fetch(`http://localhost:5000/pokemons/${pokemon.id}`, {
//       method: "PUT",
//       body: JSON.stringify(pokemon),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .catch((error) => this.handleError(error));
//   }

//   static deletePokemon(pokemon: Pokemon): Promise<{}> {
//     return fetch(`http://localhost:5000/pokemons/${pokemon.id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .catch((error) => this.handleError(error));
//   }

//   static addPokemon(pokemon: Pokemon): Promise<Pokemon> {
//     // delete pokemon.created; 
//     return fetch(`http://localhost:5000/pokemons/`, {
//       method: "POST",
//       body: JSON.stringify(pokemon),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .catch((error) => this.handleError(error));
//   }

//   static isEmpty(data: Object): boolean {
//     return Object.keys(data).length === 0;
//   }

//   static handleError(error: Error): void {
//     console.error(error);
//   }
// }

import Pokemon from "../models/pokemon";

export default class PokemonService {
  static async getPokemons(): Promise<Pokemon[]> {
    try {
      const response = await fetch("http://localhost:5000/pokemons");
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching Pokemons:", error);
      throw error; // Vous devriez probablement propager l'erreur pour qu'elle soit gérée ailleurs si nécessaire.
    }
  }

  static async getPokemon(id: number): Promise<Pokemon | null> {
    try {
      const response = await fetch(`http://localhost:5000/pokemons/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const data = await response.json();
      return this.isEmpty(data) ? null : data;
    } catch (error) {
      console.error(`Error fetching Pokemon with ID ${id}:`, error);
      throw error; // Propagez l'erreur pour qu'elle soit gérée ailleurs si nécessaire.
    }
  }

  static async updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    try {
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

      if (!response.ok)
        throw new Error(`HTTP Error! Status: ${response.status}`);

      return await response.json();
    } catch (error) {
      console.error("Error updating Pokemon:", error);
      throw error;
    }
  }

  static async deletePokemon(pokemon: Pokemon): Promise<{}> {
    try {
      const response = await fetch(`http://localhost:5000/pokemons/${pokemon.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error deleting Pokemon:", error);
      throw error;
    }
  }

static async addPokemon(pokemon: Pokemon): Promise<Pokemon> {
  try {
    // delete pokemon.created;

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
  } catch (error) {
    console.error("Error adding Pokemon:", error);
    throw error;
  }
}

  

  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  static handleError(error: Error): void {
    console.error(error);
  }
}

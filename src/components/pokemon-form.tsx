import React, { FunctionComponent, useState } from "react";
import Pokemon from "../models/pokemon";
import formatType from "../helpers/format-type";
import { useNavigate } from "react-router-dom";
import PokemonService from "../services/pokemon-service";

type Props = {
  pokemon: Pokemon;
};

type Field = {
  value: any;
  error?: string;
  isValid?: boolean;
};

type Form = {
  name: Field;
  hp: Field;
  cp: Field;
  types: Field;
};

const PokemonForm: FunctionComponent<Props> = ({ pokemon }) => {
  const [form, setForm] = useState<Form>({
    name: { value: pokemon.name, isValid: true },
    hp: { value: pokemon.hp, isValid: true },
    cp: { value: pokemon.cp, isValid: true },
    types: { value: pokemon.types, isValid: true },
  });

  const navigate = useNavigate();

  const types: string[] = [
    "Plante",
    "Feu",
    "Eau",
    "Insecte",
    "Normal",
    "Electrik",
    "Poison",
    "Fée",
    "Vol",
    "Combat",
    "Psy",
  ];

  const hasType = (type: string): boolean => {
    return form.types.value.includes(type);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;

    setForm((prevForm) => ({
      ...prevForm,
      [fieldName]: { value: fieldValue, isValid: true }, // Vous pouvez également mettre à jour la validité ici si nécessaire
    }));
  };

  const selectType = (
    type: string,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const checked = e.target.checked;
    let newField: Field;

    if (checked) {
      // Si l'utilisateur coche un type, l'ajoute à la liste des types du pokémon.
      const newTypes: string[] = [...form.types.value, type];
      newField = { value: newTypes };
    } else {
      // Si l'utilisateur décoche un type, le retire de la liste des types du pokémon.
      const newTypes: string[] = form.types.value.filter(
        (currentType: string) => currentType !== type
      );
      newField = { value: newTypes };
    }

    setForm({ ...form, types: newField });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      try {
        pokemon.name = form.name.value;
        pokemon.hp = form.hp.value;
        pokemon.cp = form.cp.value;
        pokemon.types = form.types.value;
        
        await PokemonService.updatePokemon(pokemon);
        navigate(`/pokemons/${pokemon.id}`);
      } catch (error) {
        console.error("Error updating Pokemon:", error);
      }
    }
  };

  const validateForm = () => {
    let isFormValid = true;

    // Validator name
    if (!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)) {
      const errorMsg = "Le nom du pokémon est requis (1-25).";
      form.name.error = errorMsg;
      form.name.isValid = false;
      isFormValid = false;
    } else {
      form.name.error = "";
      form.name.isValid = true;
    }

    // Validator hp
    if (!/^[0-9]{1,3}$/.test(form.hp.value)) {
      const errorMsg =
        "Les points de vie du pokémon sont compris entre 0 et 999.";
      form.hp.error = errorMsg;
      form.hp.isValid = false;
      isFormValid = false;
    } else {
      form.hp.error = "";
      form.hp.isValid = true;
    }

    // Validator cp
    if (!/^[0-9]{1,2}$/.test(form.cp.value)) {
      const errorMsg = "Les dégâts du pokémon sont compris entre 0 et 99.";
      form.cp.error = errorMsg;
      form.cp.isValid = false;
      isFormValid = false;
    } else {
      form.cp.error = "";
      form.cp.isValid = true;
    }

    setForm({ ...form });
    return isFormValid;
  };

  const isTypesValid = (type: string): boolean => {
    if (form.types.value.length === 1 && hasType(type)) {
      return false;
    }

    if (form.types.value.length >= 3 && !hasType(type)) {
      return false;
    }

    return true;
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            <div className="card-image">
              <img
                src={pokemon.picture}
                alt={pokemon.name}
                style={{ width: "250px", margin: "0 auto" }}
              />
            </div>
            <div className="card-stacked">
              <div className="card-content">
                {/* Pokemon name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control"
                    value={form.name.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {form.name.error && (
                    <div className="card-panel red accent-1">
                      {form.name.error}
                    </div>
                  )}
                </div>
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input
                    id="hp"
                    name="hp"
                    type="number"
                    className="form-control"
                    value={form.hp.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {form.hp.error && (
                    <div className="card-panel red accent-1">
                      {form.hp.error}
                    </div>
                  )}
                </div>
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input
                    id="cp"
                    name="cp"
                    type="number"
                    className="form-control"
                    value={form.cp.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {form.cp.error && (
                    <div className="card-panel red accent-1">
                      {form.cp.error}
                    </div>
                  )}
                </div>
                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map((type) => (
                    <div key={type} style={{ marginBottom: "10px" }}>
                      <label>
                        <input
                          id={type}
                          type="checkbox"
                          className="filled-in"
                          value={type}
                          disabled={!isTypesValid(type)} // Si le type n'est pas valide, alors on verrouille la case à cocher
                          checked={hasType(type)}
                          onChange={(e) => selectType(type, e)}
                        ></input>
                        <span>
                          <p className={formatType(type)}>{type}</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PokemonForm;
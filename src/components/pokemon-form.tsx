import React, { FunctionComponent, useState } from "react";
import Pokemon from "../models/pokemon";
import formatType from "../helpers/format-type";
import { useNavigate } from "react-router-dom";
import PokemonService from "../services/pokemon-service";

type Props = {
  pokemon: Pokemon;
  isEditForm: boolean;
};

type Field = {
  value: any;
  error?: string;
  isValid?: boolean;
};

type Form = {
  picture: Field;
  name: Field;
  hp: Field;
  cp: Field;
  types: Field;
};

const PokemonForm: FunctionComponent<Props> = ({ pokemon, isEditForm }) => {
  const [form, setForm] = useState<Form>({
    picture: { value: pokemon.picture },
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
      [fieldName]: { value: fieldValue, isValid: true }, 
    }));
  };

  const selectType = (
    type: string,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const checked = e.target.checked;
    let newField: Field;

    if (checked) {
      const newTypes: string[] = [...form.types.value, type];
      newField = { value: newTypes };
    } else {
      const newTypes: string[] = form.types.value.filter(
        (currentType: string) => currentType !== type
      );
      newField = { value: newTypes };
    }

    setForm({ ...form, types: newField });
  };

  const isAddForm = () => {
    return !isEditForm;
  };

  const validateForm = () => {
    let isFormValid = true;

    if (isAddForm()) {
      const start =
        "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
      const end = ".png";

      if (
        !form.picture.value.startsWith(start) ||
        !form.picture.value.endsWith(end)
      ) {
        const errorMsg = "L'url n'est pas valide";
        const newField = { ...form.picture, error: errorMsg, isValid: false };
        setForm((prevForm) => ({ ...prevForm, picture: newField }));
        isFormValid = false;
      } else {
        const newField = { ...form.picture, error: "", isValid: true };
        setForm((prevForm) => ({ ...prevForm, picture: newField }));
      }
    }

    if (!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)) {
      const errorMsg = "Le nom du pokémon est requis (1-25).";
      const newField = { ...form.name, error: errorMsg, isValid: false };
      setForm((prevForm) => ({ ...prevForm, name: newField }));
      isFormValid = false;
    } else {
      const newField = { ...form.name, error: "", isValid: true };
      setForm((prevForm) => ({ ...prevForm, name: newField }));
    }

    if (!/^[0-9]{1,3}$/.test(form.hp.value)) {
      const errorMsg = "Les points de vie du pokémon sont compris entre 0 et 999.";
      const newField = { ...form.hp, error: errorMsg, isValid: false };
      setForm((prevForm) => ({ ...prevForm, hp: newField }));
      isFormValid = false;
    } else {
      const newField = { ...form.hp, error: "", isValid: true };
      setForm((prevForm) => ({ ...prevForm, hp: newField }));
    }

    if (!/^[0-9]{1,2}$/.test(form.cp.value)) {
      const errorMsg = "Les dégâts du pokémon sont compris entre 0 et 99.";
      const newField = { ...form.cp, error: errorMsg, isValid: false };
      setForm((prevForm) => ({ ...prevForm, cp: newField }));
      isFormValid = false;
    } else {
      const newField = { ...form.cp, error: "", isValid: true };
      setForm((prevForm) => ({ ...prevForm, cp: newField }));
    }

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      try {
        const updatedPokemon = { ...pokemon };
        updatedPokemon.picture = form.picture.value;
        updatedPokemon.name = form.name.value;
        updatedPokemon.hp = form.hp.value;
        updatedPokemon.cp = form.cp.value;
        updatedPokemon.types = form.types.value;

        if (isEditForm) {
          await updatePokemon(updatedPokemon);
        } else {
          await addPokemon(updatedPokemon);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const addPokemon = async (pokemon: Pokemon) => {
    try {
      await PokemonService.addPokemon(pokemon);
      navigate(`/pokemons`);
    } catch (error) {
      console.error("Error adding Pokemon:", error);
    }
  };

  const updatePokemon = async (pokemon: Pokemon) => {
    try {
      await PokemonService.updatePokemon(pokemon);
      navigate(`/pokemons/${pokemon.id}`);
    } catch (error) {
      console.error("Error updating Pokemon:", error);
    }
  };

  const deletePokemon = async () => {
    try {
      await PokemonService.deletePokemon(pokemon);
      navigate(`/pokemons`);
    } catch (error) {
      console.error("Error deleting Pokemon:", error);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            {isEditForm && (
              <div className="card-image">
                <img
                  src={pokemon.picture}
                  alt={pokemon.name}
                  style={{ width: "250px", margin: "0 auto" }}
                />
                <span className="btn-floating halfway-fab waves-effect waves-light">
                  <i onClick={deletePokemon} className="material-icons">
                    delete
                  </i>
                </span>
              </div>
            )}
            <div className="card-stacked">
              <div className="card-content">
                {/* Pokemon picture */}
                {isAddForm() && (
                  <div className="form-group">
                    <label htmlFor="name">Image</label>
                    <input
                      id="picture"
                      name="picture"
                      type="text"
                      className="form-control"
                      value={form.picture.value}
                      onChange={(e) => handleInputChange(e)}
                    ></input>
                    {form.picture.error && (
                      <div className="card-panel red accent-1">
                        {form.picture.error}
                      </div>
                    )}
                  </div>
                )}
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
                          disabled={!isTypesValid(type)}
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

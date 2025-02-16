import { useEffect, useState } from "react";
import { pokeAPI } from "../pokeApi/api";
import { useNavigate } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import PokemonModal from "../components/PokemonModal";
import {
  loadFavoritePokemons,
  storeFavoritePokemons,
} from "../pokeApi/favorites";

export default () => {
  const navigate = useNavigate();
  const [pokemonList, setPokemonList] = useState([]);
  const [roster, setRoster] = useState(loadFavoritePokemons());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        // Fetch the list of Pokémon (first 10 Pokémon for example)
        const response = await pokeAPI.get("/pokemon");
        const pokemons = response.data.results;

        const detailedPokemons = await Promise.all(
          pokemons.map(async (pokemon) => {
            const pokemonData = await pokeAPI.get(pokemon.url);
            return pokemonData.data;
          })
        );

        setPokemonList(detailedPokemons);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  // Toggle Pokémon in roster
  const toggleRoster = (pokemon) => {
    if (roster.has(pokemon.id)) {
      roster.delete(pokemon.id);
    } else {
      roster.add(pokemon.id);
    }
    setRoster(roster);
    storeFavoritePokemons(roster);
  };

  // Open modal
  const openModal = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  // Close modal
  const closeModal = () => {
    setSelectedPokemon(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (error) <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {pokemonList.map((pokemon) => (
        <PokemonCard pokemon={pokemon} openModal={openModal} />
      ))}

      {/* Modal */}
      {selectedPokemon && (
        <PokemonModal
          selectedPokemon={selectedPokemon}
          toggleRoster={toggleRoster}
          closeModal={closeModal}
          roster={roster}
        />
      )}
    </div>
  );
};

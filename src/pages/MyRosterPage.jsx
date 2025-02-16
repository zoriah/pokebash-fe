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
  const [roster, setRoster] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const detailedPokemons = await Promise.all(
          loadFavoritePokemons()
            .values()
            .map(async (pokemon) => {
              const pokemonData = await pokeAPI.get(pokemon.url);
              return pokemonData.data;
            })
        );

        setRoster(
          new Map(
            detailedPokemons.map((pokemon) => {
              [pokemon.id, pokemon];
            })
          )
        );
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
      roster.set(pokemon.id, pokemon);
    }
    setRoster(roster);
    storeFavoritePokemons(roster.keys());
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
      {roster.values().map((pokemon) => (
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

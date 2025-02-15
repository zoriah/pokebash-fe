import React, { useState } from "react";
import { useRoster } from "../contexts/RosterContext"; // Retrieve roster from context
import PokemonCard from "../components/PokemonCard";
import PokemonModal from "../components/PokemonModal"; // Added modal component

const MyRosterPage = () => {
  const { roster, toggleRoster } = useRoster(); // Roster and function
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Modal Open/Close Functions
  const openModal = (pokemon) => setSelectedPokemon(pokemon);
  const closeModal = () => setSelectedPokemon(null);

  return (
    <div className="container mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">My Roster</h1>

      {roster.length === 0 ? (
        <p className="text-center text-gray-500">
          No Pokémon in your roster yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {roster.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onClick={openModal} // Enabled modal opening
            />
          ))}
        </div>
      )}

      {/* Modal Component */}
      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          closeModal={closeModal}
          toggleRoster={toggleRoster} // Provided function to remove from roster
          roster={roster}
        />
      )}
    </div>
  );
};

export default MyRosterPage;

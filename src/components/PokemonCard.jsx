import React from "react";
import { useRoster } from "../contexts/RosterContext"; // 📌 Imported the Roster

const PokemonCard = ({ pokemon, onClick }) => {
  const { roster, toggleRoster } = useRoster(); // 📌 Get favorite Pokémon and add/remove function

  // Is the Pokémon in favorites? (Exists in the Roster?)
  const isFavorite = roster.some((p) => p.id === pokemon.id);

  return (
    <div
      className="p-4 bg-white rounded-xl shadow-lg flex flex-col items-center relative cursor-pointer hover:scale-105 transition-transform"
      onClick={() => onClick(pokemon)}
    >
      <h1 className="text-lg font-bold text-gray-800 capitalize">
        {pokemon.name}
      </h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-24 h-24 object-contain"
      />
      <p className="text-sm font-semibold mt-2 bg-gray-200 px-2 py-1 rounded-md uppercase">
        {pokemon.types[0].type.name}
      </p>

      {/* Heart Button (Add/Remove Favorite) */}
      <button
        className="absolute top-2 right-2 text-2xl"
        onClick={(e) => {
          e.stopPropagation(); // Ensures it works separately from card click
          toggleRoster(pokemon);
        }}
      >
        {isFavorite ? (
          <span className="text-red-500">❤️</span>
        ) : (
          <span className="text-gray-400">🤍</span>
        )}
      </button>
    </div>
  );
};

export default PokemonCard;

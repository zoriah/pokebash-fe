import React from "react";

const PokemonCard = ({ pokemon, openModal }) => {
  return (
    <div
      key={pokemon.id}
      className="text-sm w-72 p-6 bg-white rounded-lg shadow-lg flex flex-col items-center relative cursor-pointer hover:scale-105 transition-transform"
      onClick={() => openModal(pokemon)}
    >
      <h1 className="font-bold text-center text-gray-800 capitalize">
        {pokemon.name}
      </h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-36 h-36 mx-auto mb-4 object-contain"
      />

      <p className="text-lg font-semibold">
        <span className="uppercase text-white bg-gray-700 px-2 py-1 rounded-md">
          {pokemon.types[0].type.name}
        </span>
      </p>
    </div>
  );
};

export default PokemonCard;

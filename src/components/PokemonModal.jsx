import React from "react";

const PokemonModal = ({ pokemon, closeModal, toggleRoster, roster }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm mt-15">
      <div className="bg-yellow-300 border-4 border-gray-700 rounded-xl shadow-xl p-6 w-[400px] relative flex flex-col items-center">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-600 text-2xl hover:text-gray-900"
          onClick={closeModal}
        >
          ✖
        </button>
        <div className="flex flex-row justify-end items-center gap-15 mt-2">
          {/* Pokémon Name & Type */}
          <h1 className="text-2xl font-bold text-gray-800 mt-3 capitalize">
            {pokemon.name}
          </h1>
          <p className="text-md font-semibold bg-yellow-200 px-3 py-1 rounded-md uppercase border border-yellow-500 mt-2">
            {pokemon.types[0].type.name}
          </p>

          {/* Heart Button */}
          <div
            className="text-2xl cursor-pointer mt-5 mb-5"
            onClick={() => toggleRoster(pokemon)}
          >
            {roster.some((p) => p.id === pokemon.id) ? (
              <div className="text-red-500">❤️</div>
            ) : (
              <span className="text-gray-400">🤍</span>
            )}
          </div>
        </div>
        {/* Pokémon Image */}
        <div className="w-full h-40 bg-white rounded-md flex justify-center items-center shadow-inner border border-gray-400">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-32 h-32 object-contain drop-shadow-lg"
          />
        </div>

        {/* Abilities */}
        <h3 className="text-lg font-semibold">Abilities</h3>
        <ul className="list-disc list-inside text-black-600 self-start ">
          {pokemon.abilities.map((ability, index) => (
            <li key={index} className="text-sm capitalize">
              {ability.ability.name}
            </li>
          ))}
        </ul>

        {/* Stats */}
        <h3 className="text-lg font-semibold">Stats</h3>
        <ul className="w-full ">
          {pokemon.stats.map((stat, index) => (
            <li key={index} className="flex flex-col">
              <p className="text-sm font-medium capitalize">
                {stat.stat.name.replace("-", " ")}: {stat.base_stat}
              </p>
              <div className="w-full bg-gray-300 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${getStatColor(
                    index
                  )}`}
                  style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/* Assigning Colors */
const getStatColor = (index) => {
  const colors = [
    "bg-green-500",
    "bg-red-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
  ];
  return colors[index % colors.length];
};

export default PokemonModal;

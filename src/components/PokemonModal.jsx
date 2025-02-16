import React from "react";

const PokemonModal = ({
  selectedPokemon,
  roster,
  toggleRoster,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[400px] relative border-4 border-black">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-white text-2xl hover:text-gray-900"
          onClick={closeModal}
        >
          ✖
        </button>

        {/* Pokémon Image */}
        <div className="flex flex-col items-center">
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
            className="w-40 h-40 object-contain drop-shadow-md"
          />

          <h1 className="text-xl font-bold text-gray-800 mt-3 capitalize">
            {selectedPokemon.name}
          </h1>

          {/* Type and Heart Icon inside modal */}
          <div className="flex items-center gap-4 mt-2">
            <p className="text-lg font-semibold">
              Type:{" "}
              <span className="uppercase bg-gray-700 px-3 py-1 rounded-md">
                {selectedPokemon.types[0].type.name}
              </span>
            </p>

            {/* Heart Button in Modal */}
            <div
              className="text-3xl cursor-pointer"
              onClick={() => toggleRoster(selectedPokemon)}
            >
              {roster.has(selectedPokemon.id) ? (
                <div className="text-red-500">❤️</div>
              ) : (
                <span className="text-gray-400">🤍</span>
              )}
            </div>
          </div>
        </div>

        {/* Abilities */}
        <h3 className="text-xl font-semibold mt-4 text-gray-700">Abilities</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          {selectedPokemon.abilities.map((ability, index) => (
            <li key={index} className="text-sm capitalize">
              {ability.ability.name}
            </li>
          ))}
        </ul>

        {/* Stats with Progress Bars */}
        <h3 className="text-xl bg-white font-semibold mt-4">Stats</h3>
        <ul className="w- mt-2 space-y-3 text-gray-700">
          {selectedPokemon.stats.map((stat, index) => (
            <li key={index} className="flex flex-col">
              <p className="text-sm font-medium capitalize">
                {stat.stat.name.replace("-", " ")}: {stat.base_stat}
              </p>
              <div className="w-full bg-gray-300 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    index === 0
                      ? "bg-green-500"
                      : index === 1
                      ? "bg-red-500"
                      : index === 2
                      ? "bg-blue-500"
                      : index === 3
                      ? "bg-yellow-500"
                      : index === 4
                      ? "bg-purple-500"
                      : "bg-pink-500"
                  }`}
                  style={{
                    width: `${(stat.base_stat / 255) * 100}%`,
                  }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonModal;

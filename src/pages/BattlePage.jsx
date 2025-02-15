import React, { useState, useEffect } from "react";
import { useRoster } from "../contexts/RosterContext"; // 📌 Imported Roster
import { pokeAPI } from "../pokeApi/api"; // 📌 Import PokéAPI service
import {
  createScore,
  updateScore,
  fetchLeaderboard,
} from "../pokeApi/services";

const BattlePage = () => {
  const { roster } = useRoster(); // 📌 Get only Pokémon added to favorites
  const [username, setUsername] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [battleResult, setBattleResult] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    const data = await fetchLeaderboard();
    setLeaderboard(data);
  };

  // Set selected Pokémon
  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
    setBattleResult(null);
  };

  // Fetch a random opponent Pokémon from PokéAPI
  const generateEnemyPokemon = async () => {
    try {
      const randomId = Math.floor(Math.random() * 1010) + 1; // Get a random Pokémon ID (1-1010)
      const response = await pokeAPI.get(`/pokemon/${randomId}`); // Fetch data from API
      return response.data; // Return Pokémon data
    } catch (error) {
      console.error("Error fetching enemy Pokémon:", error);
      return null;
    }
  };

  // Handle fight button click
  const handleFightClick = async () => {
    // if (!selectedPokemon || !username) {
    //   alert("Please enter a username and select a Pokémon!");
    //   return;
    // }
    if (!selectedPokemon) {
      alert("Please select a Pokémon!");
      return;
    }
    if (!selectedPokemon || !username) {
      alert("Please enter a username ");
      return;
    }

    const enemy = await generateEnemyPokemon(); // Wait for enemy Pokémon to be fetched
    if (enemy) {
      setEnemyPokemon(enemy); // Set the enemy Pokémon
      setTimeout(handleBattle, 500); // Start battle after enemy is set
    } else {
      alert("Failed to fetch opponent Pokémon. Try again!");
    }
  };

  // Battle mechanism
  const handleBattle = () => {
    generateEnemyPokemon();
    // if (!selectedPokemon || !enemyPokemon || !username) {
    //   alert("Please enter a username and select a Pokémon!");
    //   return;
    // }

    if (!selectedPokemon) {
      alert("Please select a Pokémon!");
      return;
    }
    if (!enemyPokemon) {
      alert("enemyPokemon is null!");
      return;
    }
    if (!username) {
      alert("Please enter a username ");
      return;
    }

    const playerPower = selectedPokemon.stats.reduce(
      (sum, stat) => sum + stat.base_stat,
      0
    );
    const enemyPower = enemyPokemon.stats.reduce(
      (sum, stat) => sum + stat.base_stat,
      0
    );

    let winner;
    let points = 0;

    if (playerPower > enemyPower) {
      winner = username;
      points = 10;
    } else if (playerPower < enemyPower) {
      winner = "Computer";
      points = 0;
    } else {
      winner = "Draw";
      points = 5;
    }

    setBattleResult({ winner, points });

    if (winner === username) {
      updateLeaderboard(username, points);
    }
  };

  // Update leaderboard
  const updateLeaderboard = async (username, points) => {
    const existingPlayer = leaderboard.find(
      (entry) => entry.username === username
    );

    if (existingPlayer) {
      const newScore = existingPlayer.score + points;
      await updateScore(existingPlayer._id, newScore);
    } else {
      await createScore(username, points);
    }

    fetchLeaderboardData();
  };

  return (
    <div className="container mx-auto px-4 mt-10">
      {/* Username Input */}
      <div className="text-center mb-6">
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg text-lg"
        />
      </div>

      <div className="flex justify-center gap-8">
        {/* Pokémon Selection (Only Roster Pokémon will be displayed) */}
        <div className="w-1/4 h-96 overflow-y-auto border p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-center mb-2">
            Select Pokémon from Roster
          </h2>
          {roster.length === 0 ? (
            <p className="text-center text-gray-500">No Pokémon in roster.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {roster.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className="p-2 bg-white rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSelectPokemon(pokemon)}
                >
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-16 h-16 object-contain"
                  />
                  <p className="capitalize">{pokemon.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Pokémon and Opponent Pokémon */}
        <div className="w-1/4 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-3">Your Pokémon</h2>
          {selectedPokemon ? (
            <div className="p-4 bg-blue-100 rounded-lg shadow-lg flex flex-col items-center">
              <img
                src={selectedPokemon.sprites.front_default}
                alt={selectedPokemon.name}
                className="w-24 h-24"
              />
              <p className="capitalize text-lg">{selectedPokemon.name}</p>
            </div>
          ) : (
            <p className="text-gray-500">No Pokémon Selected</p>
          )}
        </div>

        <div className="w-1/4 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-3">Opponent</h2>
          {enemyPokemon ? (
            <div className="p-4 bg-red-100 rounded-lg shadow-lg flex flex-col items-center">
              <img
                src={enemyPokemon.sprites.front_default}
                alt={enemyPokemon.name}
                className="w-24 h-24"
              />
              <p className="capitalize text-lg">{enemyPokemon.name}</p>
            </div>
          ) : (
            <p className="text-gray-500">No Pokémon Selected</p>
          )}
        </div>
      </div>

      {/* Fight Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleFightClick}
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-xl font-bold shadow-lg hover:bg-yellow-600"
        >
          Fight! ⚔️
        </button>
      </div>

      {/* Battle Result */}
      {battleResult && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold">Battle Result</h2>
          <p className="text-lg mt-2">
            {battleResult.winner === "Draw"
              ? "It's a Draw! 🤝"
              : battleResult.winner === username
              ? `🏆 ${username} Wins! +${battleResult.points} Points`
              : "💀 Computer Wins!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default BattlePage;

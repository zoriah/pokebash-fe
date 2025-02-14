import { useState } from "react";
import {
  fetchLeaderboard,
  createScore,
  updateScore,
  deleteScore,
} from "../pokeApi/services";

const TestServiceApi = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [editId, setEditId] = useState(null); // ID of the item being edited
  const [username, setUsername] = useState("");
  const [score, setScore] = useState("");

  // GET: Fetch leaderboard data
  const handleFetch = async () => {
    const data = await fetchLeaderboard();
    console.log("Leaderboard Data:", data);
    setLeaderboard(data);
  };

  // POST: Add a new score
  const handleAdd = async () => {
    if (!username || !score) {
      alert("Please enter a username and score!");
      return;
    }
    const data = await createScore(username, Number(score));
    console.log("Added Score:", data);
    handleFetch(); // Refresh the leaderboard
  };

  // PUT: Update a score
  const handleUpdate = async () => {
    if (!editId || !username || !score) {
      alert("Please select an entry and enter new values!");
      return;
    }
    const data = await updateScore(editId, Number(score));
    console.log("Updated Score:", data);
    setEditId(null); // Exit edit mode
    setUsername("");
    setScore("");
    handleFetch();
  };

  // DELETE: Delete a score
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this score?"
    );
    if (!confirmDelete) return;

    try {
      const data = await deleteScore(id);
      console.log("Deleted Score:", data);
      handleFetch();
    } catch (error) {
      console.error("Error deleting score:", error);
    }
  };

  // Enable edit mode with selected entry
  const handleEdit = (player) => {
    setEditId(player._id);
    setUsername(player.username);
    setScore(player.score);
  };

  return (
    <div className="p-5 bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">
        Leaderboard API Test
      </h2>

      {/* GET - Fetch leaderboard data */}
      <button
        onClick={handleFetch}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full mb-3"
      >
        Get Leaderboard
      </button>

      {/* Display leaderboard list */}
      <ul className="mb-4">
        {leaderboard.map((player, index) => (
          <li
            key={player._id}
            className="flex justify-between p-2 bg-white shadow-sm mb-2 rounded"
          >
            <span>
              {index + 1}. {player.username} - {player.score} XP
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(player)}
                className="bg-yellow-500 text-white p-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(player._id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Form for adding and updating scores */}
      <h3 className="text-lg font-semibold mb-2">
        {editId ? "Update Score" : "Add New Score"}
      </h3>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 border rounded w-full mb-2"
      />
      <input
        type="number"
        placeholder="Score"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        className="p-2 border rounded w-full mb-2"
      />
      {editId ? (
        <button
          onClick={handleUpdate}
          className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 w-full mb-3"
        >
          Update Score
        </button>
      ) : (
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-full mb-3"
        >
          Add Score
        </button>
      )}
    </div>
  );
};

export default TestServiceApi;

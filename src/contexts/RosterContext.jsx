import { createContext, useContext, useState } from "react";

// 📌 Create Context
const RosterContext = createContext();

// 📌 Export useRoster Hook (Be careful to avoid errors here!)
export const useRoster = () => useContext(RosterContext);

// 📌 RosterProvider component
export const RosterProvider = ({ children }) => {
  const [roster, setRoster] = useState([]);

  // 📌 Toggle function to add/remove Pokémon from the roster
  const toggleRoster = (pokemon) => {
    setRoster((prevRoster) =>
      prevRoster.some((p) => p.id === pokemon.id)
        ? prevRoster.filter((p) => p.id !== pokemon.id)
        : [...prevRoster, pokemon]
    );
  };

  return (
    <RosterContext.Provider value={{ roster, setRoster, toggleRoster }}>
      {children}
    </RosterContext.Provider>
  );
};

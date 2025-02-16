import { pokeAPI } from "./api";

export function loadFavoritePokemons() {
  //wir holen uns die favoritenliste aus localstorage und wenn es keine gibt erzeugen wir eine leere.
  return new Set(JSON.parse(localStorage.getItem("favorites")) || []);
}

export function storeFavoritePokemons(pokemonIds) {
  //array.from pokemonIds interpretiert pokemonIds als eine Folge von Objekten und speichert sie in ein Array
  //JSON.stringify nimmt dieses Objekt und codiert es in ein JSON string um
  localStorage.setItem("favorites", JSON.stringify(Array.from(pokemonIds)));
}

export async function fetchPokemon(id) {
  // Abruf der Pokémon-Daten anhand der ID
  const response = await pokeAPI.get(`/pokemon/${id}`);
  const pokemon = response.data;
  // Die Daten des Pokémon werden zurückgegeben
  return pokemon;
}

export function removeFromFavorites(id) {
  //deklarieren einer variable die dem Rückgabewert loadFavoritePokemons entspricht
  let favorites = loadFavoritePokemons();
  //Aufrufen der Funktion add und übergabe der ID
  favorites.delete(id);
  storeFavoritePokemons(favorites);
}
export function addToFavorites(id) {
  //deklarieren einer variable die dem Rückgabewert loadFavoritePokemons entspricht
  let favorites = loadFavoritePokemons();
  //Aufrufen der Funktion add und übergabe der ID
  favorites.add(id);
  storeFavoritePokemons(favorites);
}

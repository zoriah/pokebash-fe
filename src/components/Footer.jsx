const Footer = () => {
  return (
    <footer className="bg-red-600 text-white text-center p-4 mt-8">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Pokémon: Battle Game. All rights
        reserved.
      </p>
      <p className="text-xs mt-1">
        Data provided by{" "}
        <a
          href="https://pokeapi.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          PokéAPI
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;

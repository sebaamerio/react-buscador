import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useMovie } from "./hook/useMovie.js";
import { CardMovie } from "./components/Movies/Movies.jsx";

import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [sort, setSort] = useState(false);
  const { movies, loading, getMovies } = useMovie({ search, sort });

  const handlerCilck = () => {
    getMovies({ search });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const debouncedMovies = useDebouncedCallback(
    // function
    ({ search }) => {
      getMovies({ search });
    },
    // delay in ms
    1000
  );

  const handleChangeSearch = (event) => {
    const newSearch = event.target.value;
    /* Hacer las validacions con el valor del elemento y no con el de estado ya que tarda en actualizar 
	es una asignacion asincronica
	*/

    // Evitar que comience con espacio vacio.
    if (newSearch.startsWith(" ")) return;

    setSearch(newSearch);
    if (newSearch === "") {
      setError("No se puede buscar una pelicula vacía.");
      return;
    }
    if (newSearch.length < 3) {
      setError("La busqueda debe tener al menos 3 caracteres.");
      return;
    }

    debouncedMovies({ search: newSearch });
    setError(null);
  };

  return (
    <div className="page">
      <header className="header">
        <form className="header__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="header__input"
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "transparent",
            }}
            placeholder="Ingrese 3 letras de pelicula"
            value={search}
            onChange={handleChangeSearch}
          ></input>
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button className="header__button" onClick={handlerCilck}>
            Buscar
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main className="main">
        {loading ? <h4>Cargando ...</h4> : <CardMovie movies={movies} />}
      </main>
      <footer className="footer">
        <p className="footer__text">
          © 2024 Mi Sitio Web. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}

export default App;

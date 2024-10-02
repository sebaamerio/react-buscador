import { useState, useRef, useMemo, useCallback } from "react";
import { searchMovies } from "../services/movieService.js";

export function useMovie({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  const getMovies = useCallback(async ({ search }) => {
    if (search == previousSearch.current) return;
    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const result = await searchMovies({ search });
      setMovies(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const sortedMovies = useMemo(() => {
    let sortedMovies = [];

    if (movies != undefined) {
      sortedMovies = sort
        ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
        : movies;
    }
    return sortedMovies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, loading };
}

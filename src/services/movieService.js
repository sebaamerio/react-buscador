const url = "http://www.omdbapi.com/?apikey=94fa3370&s=";

export async function searchMovies({ search }) {
  if (search === null) return null;
  try {
    const res = await fetch(`${url}${search}`);
    const moviesData = await res.json();

    const mappedMovies = moviesData.Search?.map((item) => {
      return {
        id: item.imdbID,
        title: item.Title,
        type: item.Type,
        poster: item.Poster,
        year: item.Year,
      };
    });
    return mappedMovies;
  } catch (error) {
    throw new Error("Error seaching movies");
  }
}

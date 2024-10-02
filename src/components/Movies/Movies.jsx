import "./movies.css";

const ListOfMovies = ({ movies }) => {
  return (
    <section className="sectionMovie">
      {movies.map((item) => {
        return (
          <article className="article" key={item.id}>
            <header className="article__header">{item.title}</header>
            <img
              className="article__image"
              src={item.poster}
              alt={item.title}
            />
            <footer className="article__footer">
              <label>Year: {item.year}</label>
              <label>Type: {item.type}</label>
            </footer>
          </article>
        );
      })}
    </section>
  );
};

const NoMovies = () => {
  return <p>No Results</p>;
};

export const CardMovie = ({ movies }) => {
  const hasMovies = movies?.length > 0;

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMovies />;
};

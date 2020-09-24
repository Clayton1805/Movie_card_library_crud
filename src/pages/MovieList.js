import React, { Component } from 'react';
import MovieCard from '../components/MovieCard';

import { getMovies } from '../services/movieAPI';
import { Loading } from '../components';

class MovieList extends Component {
  constructor() {
    super();
    this.renderizar = this.renderizar.bind(this);
    this.imprimir = this.imprimir.bind(this);
    this.state = {
      movies: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.renderizar();
  }

  imprimir() {
    const { movies, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return movies.map((movie) => <MovieCard key={movie.title} movie={movie} />);
  }

  async renderizar() {
    this.setState(
      { loading: true },
      async () => {
        const movie = await getMovies();
        this.setState({
          movies: movie,
          loading: false,
        });
      },
    );
  }


  render() {
    // Render Loading here if the request is still happening

    return (
      <div data-testid="movie-list">
        {this.imprimir()}
      </div>
    );
  }
}

export default MovieList;

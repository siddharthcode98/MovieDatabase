import { Component } from "react";
import { Link } from "react-router-dom";

import { MdOutlineSearch } from "react-icons/md";
import "./index.css";
import Context from "../../context/Context";

class Header extends Component {
  state = { search: "", currentPage: 1, searchList: [] };
  onUserInput = (event) => {
    this.setState({ search: event.target.value });
  };

  caseConvert = (arr) => {
    return arr.map((item) => ({
      id: item.id,
      posterPath: item.poster_path,
      title: item.title,
      voteAverage: item.vote_average,
    }));
  };
  getSearchMovies = async () => {
    const { currentPage, search } = this.state;
    const PopularApi = `https://api.themoviedb.org/3/search/movie?api_key=98ccf2ec8c8db509095bed7dceca517d&language=en-US&query=${search}&page=${currentPage}`;
    const response = await fetch(PopularApi);
    if (response.ok === true) {
      const dataObj = await response.json();
      const modifiedMovieList = this.caseConvert(dataObj.results);
      this.setState({ searchList: modifiedMovieList });
    }
  };
  render() {
    const { search, searchList } = this.state;
    // console.log(searchList);
    return (
      <Context.Consumer>
        {(value) => {
          const { changeSearchStatus, updateMovieList } = value;

          const onClickSearch = () => {
            this.setState({ search }, this.getSearchMovies);
            changeSearchStatus();
            updateMovieList(searchList);
          };

          const updateFunction = () => {
            updateMovieList(searchList);
          };

          return (
            <header className="header">
              <div className="nav-bar-container">
                <nav className="nav-bar">
                  <h1 className="title">movieDB</h1>
                  <div className="search-bar-links-container">
                    <div className="search-bar-container" id="searchBar">
                      <button
                        className="search-icon"
                        type="button"
                        onClick={onClickSearch}
                      >
                        <MdOutlineSearch />
                      </button>
                      <input
                        type="search"
                        className="search-bar"
                        placeholder="search movies"
                        value={search}
                        onChange={this.onUserInput}
                      />
                    </div>
                    <Link to="/">
                      <button className="nav-button">Popular</button>
                    </Link>
                    <Link to="/top-rated">
                      <button className="nav-button">Top-Rated</button>
                    </Link>
                    <Link to="/upcoming">
                      <button className="nav-button">Upcoming</button>
                    </Link>
                  </div>
                </nav>
              </div>
            </header>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default Header;

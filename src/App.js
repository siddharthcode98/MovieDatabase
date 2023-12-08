import { Component } from "react";

import { Switch, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Popular from "./components/Popular";
import TopRated from "./components/TopRated";
import Upcoming from "./components/UpComing";
import Footer from "./components/Footer";
import Context from "./context/Context";

// write your code here
class App extends Component {
  state = { searchMovieList: [], isSearch: false };

  changeSearchStatus = () => {
    this.setState((prevState) => ({
      isSearch: !prevState.isSearch,
    }));
  };
  updateMovieList = (movieList) => {
    this.setState({ searchMovieList: movieList });
  };

  render() {
    const { searchMovieList, isSearch } = this.state;
    console.log(searchMovieList);
    return (
      <Context.Provider
        value={{
          searchMovieList,
          isSearch,
          changeSearchStatus: this.changeSearchStatus,
          updateMovieList: this.updateMovieList,
        }}
      >
        <main className="main-container">
          <Header />
          <Switch>
            <Route exact path="/" component={Popular} />
            <Route exact path="/top-rated" component={TopRated} />
            <Route exact path="/upcoming" component={Upcoming} />
          </Switch>
          <Footer />
        </main>
      </Context.Provider>
    );
  }
}

export default App;

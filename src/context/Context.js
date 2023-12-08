import React from "react";
const Context = React.createContext({
  searchMovieList: [],
  updateMovieList: () => {},
  isSearch: false,
  changeSearchStatus: () => {},
});

export default Context;

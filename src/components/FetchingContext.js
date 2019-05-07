import React, { Component } from "react";

const FetchingContext = React.createContext({
  fetching: false,
  setFetching: () => {}
});

export default FetchingContext;

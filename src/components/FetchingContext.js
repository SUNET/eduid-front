import React, { Component } from 'react';


export default const FetchingContext = React.createContext({
    fetching: false,
    setFetching: () => {}
});

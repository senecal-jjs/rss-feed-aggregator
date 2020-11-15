import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Routes from "./Router";
import { AppContext } from "./libs/contextLib";

function App() {
  const history = useHistory();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (
    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
      <Routes />
    </AppContext.Provider>
  )
}

export default App;

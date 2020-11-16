import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Routes from "./Router";
import { AppContext } from "./libs/contextLib";
import { currentSession } from "./auth/Auth";

function App() {
  const history = useHistory();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  function onLoad() {
    try {
      currentSession();
      userHasAuthenticated(true);
    } catch(e) {
      userHasAuthenticated(false); 
    }

    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating && (
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>
    )
  )
}

export default App;

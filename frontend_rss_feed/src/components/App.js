import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Login from "./Login";
import Container from "./common/Container";
import H1 from "./common/Heading";
import { AppContext } from "../libs/contextLib";

function App() {
  const history = useHistory();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (
    <AppContext.Provider>
      <Container>
        <H1>Login or Register</H1>
        <Login history={history} />
      </Container>
    </AppContext.Provider>
  )
}

export default App;

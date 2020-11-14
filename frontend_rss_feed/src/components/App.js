import React from 'react';
import Login from "./Login";
import Container from "./common/Container";
import H1 from "./common/Heading";

class App extends React.Component {
  render() {
    return (
      <Container>
        <H1>Login or Register</H1>
        <Login history={this.props.history} />
      </Container>
    )
  }
}

export default App;

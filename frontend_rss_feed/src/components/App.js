import React from 'react';
import Login from "./Login";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>Login or Register</header>
        <Login history={this.props.history} />
      </div>
    )
  }
}

export default App;

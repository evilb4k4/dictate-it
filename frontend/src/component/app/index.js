import React from 'react';
import {connect} from 'react-redux';
// import LandingContainer from '../landing-container';
import Dictation from '../dictation';
import {MemoryRouter, Switch, Route} from 'react-router-dom';

class App extends React.Component {

  render() {
    return (
      <main>
        <header>
          <h1>Dictation It!</h1>
          <button onClick={this.props.goToLanding}>Home</button>
        </header>
        <Dictation />
      </main>
    );
  }
}

export default App;

//<Route path='/landing' component={Landing} />

// <MemoryRouter>
// <Switch location={{ pathname: this.props.route }}>
// <Route exact path='/dictation' component={Dictation} />
// </Switch>
// </MemoryRouter>

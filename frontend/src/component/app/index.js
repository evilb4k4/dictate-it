import React from 'react';
import {connect} from 'react-redux';
import Landing from '../landing-container';

class App extends React.component{

  render() {
    return (
      <main>
        <header>
          <h1>Dictation It!</h1>
          <button onClick={this.props.goToLanding}>Home</button>
        </header>
        <MemoryRouter>
          <Switch location={{ pathname: this.props.route }}>
            <Route path='/landing' component={Landing} />
          </Switch>
        </MemoryRouter>
      </main>
    );
  }
}

import React from 'react';
import {shallow} from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {mount} from 'enzyme';
import Dictation from '../component/dictation/index.js';
import {tokenSet} from '../action/auth-actions.js';
import configureStore from 'redux-mock-store';
import Listener from '../component/listener';

describe('Testing Dictation', () => {
  let initialState = {token: 'token'};
  const mockStore = configureStore();
  let store = mockStore(initialState);

  test('testing initial state', () => {
    let wrapper = shallow(
      <Dictation store={store}/>
    );

    expect(wrapper.prop('token')).toEqual(initialState.token);
  });
});

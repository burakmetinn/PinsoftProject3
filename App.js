import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Stacks from './navigation/Stacks';
import { Provider } from 'react-redux';
import store from './app/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stacks />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

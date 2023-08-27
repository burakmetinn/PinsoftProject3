import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Stacks from './navigation/Stacks';
import { Provider } from 'react-redux';
import store from './app/store';
import { ThemeContextProvider } from './ThemeContext';


const App = () => {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <NavigationContainer>
          <Stacks />
        </NavigationContainer>
      </ThemeContextProvider> 
    </Provider>
  );
};

export default App;

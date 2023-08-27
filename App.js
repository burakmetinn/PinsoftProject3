import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Stacks from './src/navigation/Stacks';
import { Provider } from 'react-redux';
import store from './src/app/store';
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

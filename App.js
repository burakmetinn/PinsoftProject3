import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import Stacks from './navigation/Stacks';
import PermissionRequested from './requested/PermissionRequested';

const App = () => {
  return (
    <NavigationContainer>
      <Stacks />
      <PermissionRequested />
    </NavigationContainer>
  );
};

export default App;

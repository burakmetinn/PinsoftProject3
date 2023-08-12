<<<<<<< HEAD
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Stacks from "./navigation/Stacks";
=======
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import Stacks from './navigation/Stacks';
import PermissionRequested from './requested/PermissionRequested';
>>>>>>> main

const App = () => {
  return (
    <NavigationContainer>
      <Stacks />
<<<<<<< HEAD
=======
      <PermissionRequested />
>>>>>>> main
    </NavigationContainer>
  );
};

export default App;

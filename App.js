import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Stacks from "./navigation/Stacks";
import permissionRequested from "./requested/permissionRequested";

const App = () => {
  return (
    <NavigationContainer>
      <Stacks />
      <permissionRequested/>
    </NavigationContainer>
  );
};

export default App;

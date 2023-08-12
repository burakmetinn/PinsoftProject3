import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PermissionRequestScreen from "../screens/PermissionRequestScreen";
import PermissionsPendingApprovalScreen from "../screens/PermissionsPendingApprovalScreen";
import MyPermissionsScreenList from "../screens/MyPermissionsScreen/MyPermissionsScreenList";
import MyPermissionsScreenDetail from "../screens/MyPermissionsScreen/MyPermissionsScreenDetail";
import MyPermissionsScreenProfile from "../screens/MyPermissionsScreen/MyPermissionsScreenProfile";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const MyPermissionsScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My Permissions List"
        component={MyPermissionsScreenList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="My Permissions Detail"
        component={MyPermissionsScreenDetail}
        options={{ title: "Permission Details", headerTintColor: "black" }}
      />
      <Stack.Screen
        name="My Permissions Profile"
        component={MyPermissionsScreenProfile}
        options={{ title: "Profile", headerTintColor: "black" }}
      />
    </Stack.Navigator>
  );
};

const Tabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Permission Request"
        component={PermissionRequestScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-add-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Permissions Pending Approval"
        component={PermissionsPendingApprovalScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-hourglass-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="My Permissions"
        component={MyPermissionsScreenStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

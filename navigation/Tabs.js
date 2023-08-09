import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import MyPermissionsScreen from "../screens/MyPermissionsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PermissionRequestScreen from "../screens/PermissionRequestScreen";
import PermissionsPendingApprovalScreen from "../screens/PermissionsPendingApprovalScreen";
import { Ionicons } from "@expo/vector-icons";

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
        name="PermissionRequest"
        component={PermissionRequestScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-add-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="PermissionsPendingApproval"
        component={PermissionsPendingApprovalScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-hourglass-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPermissions"
        component={MyPermissionsScreen}
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

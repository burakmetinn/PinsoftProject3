import HomeScreen from '../screens/HomeScreen';
import ProfileScreenManager from '../screens/ProfileScreenManager';
import PermissionRequestScreen from '../screens/PermissionRequestScreen';
import PermissionsPendingApprovalScreen from '../screens/PermissionsPendingApprovalScreen';
import MyPermissionsScreenList from '../screens/MyPermissionsScreen/MyPermissionsScreenList';
import MyPermissionsScreenDetail from '../screens/MyPermissionsScreen/MyPermissionsScreenDetail';
import MyPermissionsScreenProfile from '../screens/MyPermissionsScreen/MyPermissionsScreenProfile';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const MyPermissionsScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='My Permissions List'
        component={MyPermissionsScreenList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='My Permissions Detail'
        component={MyPermissionsScreenDetail}
        options={{ title: 'Permission Details', headerTintColor: 'black' }}
      />
      <Stack.Screen
        name='My Permissions Profile'
        component={MyPermissionsScreenProfile}
        options={{ title: 'Profile', headerTintColor: 'black' }}
      />
    </Stack.Navigator>
  );
};

const TabsManager = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      activeColor='#205295'
      inactiveColor='#0A2647'
      barStyle={styles.tab}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Permissions Pending Approval'
        component={PermissionsPendingApprovalScreen}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='timer-sand' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='My Permissions'
        component={MyPermissionsScreenStack}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='format-list-checkbox'
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreenManager}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account' color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 40,
  },
});

export default TabsManager;
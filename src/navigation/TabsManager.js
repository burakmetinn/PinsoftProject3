import HomeScreen from '../screens/HomeScreen';
import ProfileScreenManager from '../screens/ProfileScreenManager';
import PermissionRequestScreen from '../screens/PermissionRequestScreen';
import PermissionRequestsScreen from '../screens/ExecutivePermissionScreen/PermissionRequestsScreen';
import PermissionsPendingApprovalScreen from '../screens/PermissionsPendingApprovalScreen';
import MyPermissionsScreenList from '../screens/MyPermissionsScreen/MyPermissionsScreenList';
import MyPermissionsScreenDetail from '../screens/MyPermissionsScreen/MyPermissionsScreenDetail';
import MyPermissionsScreenProfile from '../screens/MyPermissionsScreen/MyPermissionsScreenProfile';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';
import NewManager from '../screens/NewManager';
import { useThemeContext } from '../../ThemeContext';

const Stack = createStackNavigator();

const MyPermissionsScreenStack = () => {
  const { isDarkModeOn, toggleSwitch } = useThemeContext();
  const textColor = isDarkModeOn ? 'white' : 'black';
  return (
    <Stack.Navigator headerTintColor={isDarkModeOn ? 'white' : 'black'}>
      <Stack.Screen
        name='My Permissions List'
        component={MyPermissionsScreenList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='My Permissions Detail'
        component={MyPermissionsScreenDetail}
        options={{
          title: 'Profile',
          headerTintColor: textColor,
          headerStyle: {
            backgroundColor: isDarkModeOn ? '#171d2b' : '#f2f2f2',
          },
        }}
      />
      <Stack.Screen
        name='My Permissions Profile'
        component={MyPermissionsScreenProfile}
        options={{ title: 'Profile', headerTintColor: 'black' }}
      />
      <Stack.Screen
        name='New Manager'
        component={NewManager}
        options={{
          title: 'Profile',
          headerTintColor: textColor,
          headerStyle: {
            backgroundColor: isDarkModeOn ? '#171d2b' : '#f2f2f2',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const TabsManager = () => {
  const Tab = createMaterialBottomTabNavigator();
  const { isDarkModeOn, toggleSwitch } = useThemeContext();

  return (
    <Tab.Navigator
      activeColor='#205295'
      inactiveColor={isDarkModeOn ? 'gray' : '#0A2647'}
      barStyle={[
        styles.tab,
        { backgroundColor: isDarkModeOn ? '#171d2b' : 'white' },
      ]}
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

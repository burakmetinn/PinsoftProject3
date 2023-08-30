import HomeScreen from '../screens/HomeScreen';
import ProfileScreenEmployee from '../screens/ProfileScreenEmployee';
import PermissionRequestScreen from '../screens/PermissionRequestScreen';
import PermissionRequestsScreen from '../screens/ExecutivePermissionScreen/PermissionRequestsScreen';
import PermissionsPendingApprovalScreen from '../screens/PermissionsPendingApprovalScreen';
import MyPermissionsScreenList from '../screens/MyPermissionsScreen/MyPermissionsScreenList';
import MyPermissionsScreenDetail from '../screens/MyPermissionsScreen/MyPermissionsScreenDetail';
import MyPermissionsScreenProfile from '../screens/MyPermissionsScreen/MyPermissionsScreenProfile';
import MyPermissionsScreenEmployee from '../screens/MyPermissionsScreenEmployee';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';
import { useThemeContext } from "../../ThemeContext";
import HomeScreenEmployee from '../screens/HomeScreenEmployee';



const TabsEmployee = () => {
  const Tab = createMaterialBottomTabNavigator();
  const { isDarkModeOn, toggleSwitch } = useThemeContext();

  return (
    <Tab.Navigator
    activeColor='#205295'
    inactiveColor={isDarkModeOn?'gray':'#0A2647'}
    barStyle={[styles.tab,  {backgroundColor: isDarkModeOn? '#171d2b' :'white'}]}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreenEmployee}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Permission Request'
        component={PermissionRequestScreen}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='plus-circle-outline'
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Permission Requests'
        component={PermissionRequestsScreen}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='check-circle'
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name='My Permissions'
        component={MyPermissionsScreenEmployee}
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
        component={ProfileScreenEmployee}
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

export default TabsEmployee;

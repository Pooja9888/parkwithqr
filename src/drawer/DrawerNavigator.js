// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { useNavigationState } from '@react-navigation/native';
// import React from 'react';
// import Main from './Main';
// import CustomDrawer from './CustomDrawer';
// import HomeScreen from '../screen/HomeScreen';

// const Drawer = createDrawerNavigator();
// const DrawerNavigator = () => {
//   const activeTab = useNavigationState((state) => {    
//     const mainRoute = state.routes.find((route) => route.name === 'Main');
//     return mainRoute?.state?.routes[mainRoute.state.index]?.name ?? 'Parking with QR';
//   });
//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => <CustomDrawer {...props} />}
//       screenOptions={{
//         headerShown: true, // Enable main header
//       }}
//     >
//      <Drawer.Screen
//         name="Main"
//         component={Main}
//         options={{
//           headerTitle: activeTab, // Dynamic header based on active tab
//         }}
//       />
//       <Drawer.Screen
//         name="HomeScreen"
//         component={HomeScreen}
//         options={{
//           title: 'Home',
//         }}
//       />
//     </Drawer.Navigator>
//   );
// };

// export default DrawerNavigator;

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Main from './Main';
import CustomDrawer from './CustomDrawer';
import HomeScreen from '../screen/HomeScreen';
import Notification from '../screen/Notification'; // ← Make sure this exists

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const navigation = useNavigation();

  const activeTab = useNavigationState((state) => {
    const mainRoute = state.routes.find((route) => route.name === 'Main');
    return mainRoute?.state?.routes[mainRoute.state.index]?.name ?? 'Parking with QR';
  });

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Notification')}
            style={{ marginRight: 15 }}
          >
            <Ionicons name="notifications-outline" size={24} color="#5F259F" />
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen
        name="Main"
        component={Main}
        options={{
          headerTitle: activeTab,
        }}
      />
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name="Notification"
        component={Notification}
        options={{
          title: 'Notifications',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

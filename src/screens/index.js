import { Navigation, } from 'react-native-navigation';
import { gestureHandlerRootHOC, } from 'react-native-gesture-handler';

import ScreenIDs from './ScreenIDs';
import { screenHOC, } from '../custom-navigation';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchSreen';
import ProfileScreen from './ProfileScreen';
import StoreMenuScreen from './StoreMenuScreen';
import MapScreen from './MapScreen';
import OrderDetailScreen from './OrderDetailScreen';

const screens = {
  [ScreenIDs.LoginScreen]: LoginScreen,
  [ScreenIDs.HomeScreen]: HomeScreen,
  [ScreenIDs.SearchScreen]: SearchScreen,
  [ScreenIDs.ProfileScreen]: ProfileScreen,
  [ScreenIDs.StoreMenuScreen]: StoreMenuScreen,
  [ScreenIDs.MapScreen]: MapScreen,
  [ScreenIDs.OrderDetailScreen]: OrderDetailScreen,
};

const registerScreens = (Provider, store) => {
  const enhancers = screenHOC(Provider, store);
  Object.keys(screens).map((screenID) => {
    Navigation.registerComponent(screenID, () =>
      gestureHandlerRootHOC(enhancers(screens[screenID]))
    );
  });
};

export { screens, ScreenIDs, registerScreens };

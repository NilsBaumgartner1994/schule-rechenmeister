import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {Navigator, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';
import {StoreProvider} from 'easy-peasy';
import {config} from '@gluestack-ui/config';
import { useColorScheme } from '@/components/useColorScheme';
import {KeyboardAvoidingView, Platform} from "react-native";
import {View, Text, Icon} from "@/components/Themed";
import {SyncState} from "@/helper/syncState/SyncState";
import {SecureStorageHelper} from "@/helper/storage/SecureStorageHelper";
import {SecureStorageHelperAbstractClass} from "@/helper/storage/SecureStorageHelperAbstractClass";
import RootTextAndIconDimensions from "@/components/RootTextAndIconDimensions";
import {RootThemeProvider} from "@/components/rootLayout/RootThemeProvider";
import Slot = Navigator.Slot;
import {GluestackUIProvider} from "@gluestack-ui/themed";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(app)',
};

const INITIAL_RELOAD_NUMBER = 0;

SecureStorageHelperAbstractClass.setInstance(new SecureStorageHelper());

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // State for checking if fonts and storage are loaded
  //const [storageLoaded, setStorageLoaded] = useState<boolean>(false);
  const colorScheme = useColorScheme();

  const [reloadData, setReloadData] = useState
  <{
    reloadNumber: number,
    store: any
  }>
  ({
    reloadNumber: INITIAL_RELOAD_NUMBER,
    store: null,
  });
  const reloadNumber = reloadData.reloadNumber;
  const store = reloadData.store;
  const storageLoaded = store !== null;

  const [fontsLoaded, fontsError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const reset = (storageLoaded: boolean) => {
    console.log('RootLayout: reset: '+storageLoaded);
    if(!storageLoaded) {
      setReloadData({
        reloadNumber: reloadData.reloadNumber,
        store: null,
      });
    } else {
      const store = SyncState.getInstance().getStore();
      setReloadData({
        reloadNumber: reloadData.reloadNumber + 1,
        store: store,
      })
    }
  }

  async function loadStorage() {
    console.log('Load storage asynchronously and update state - reloadNumber: '+reloadNumber);
    if (!storageLoaded) {
      const instance = SyncState.getInstance();
      SyncState.setLoadState(reset);
      await instance.init();
      // init() will call the reset function
    }
  }

  // Load storage asynchronously and update state
  useEffect(() => {
    loadStorage();
  }, [storageLoaded]);

  // Hide SplashScreen after fonts and storage are loaded
  useEffect(() => {
    if (fontsLoaded && storageLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, storageLoaded]);

  // Throw font error if exists
  useEffect(() => {
    if (fontsError) throw fontsError;
  }, [fontsError]);

  // Return null if fonts or storage are not loaded
  const hotReloadOrFirstLoad = reloadNumber === INITIAL_RELOAD_NUMBER // Expo hot reload would cause storage to stay loaded, which would result in a double render
  if (!fontsLoaded || !storageLoaded || hotReloadOrFirstLoad) {
    return null;
  }

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "height" : "height"}
          style={{ flex: 1, zIndex: 999 }}
      >
        <StoreProvider store={store} key={reloadNumber+""}>
          <GluestackUIProvider config={config} key={reloadNumber+""}>
            <RootTextAndIconDimensions />
            <RootThemeProvider key={reloadNumber+""}>
              <View style={{visibility: "hidden",
                height: 0,
              }}>
                <a href="[https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2FNilsBaumgartner1994%2Fschule-rechenmeister](https://github.com/FireboltCasters/schule-rechenmeister)"><img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2FFireboltCasters%2Fschule-rechenmeister&label=Besucher&countColor=%23263759" /></a>
              </View>
              <Slot />
            </RootThemeProvider>
          </GluestackUIProvider>
        </StoreProvider>
      </KeyboardAvoidingView>
  );
}

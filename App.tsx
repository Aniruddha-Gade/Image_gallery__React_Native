/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RootNavigation from './src/navigations/RootNavigation';
import { PaperProvider } from 'react-native-paper';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <PaperProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <RootNavigation />
        </PaperProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;

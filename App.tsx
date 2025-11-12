import 'react-native-get-random-values';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RootNavigation from './src/navigations/RootNavigation';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/utils/toastConfig';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <PaperProvider>
            <RootNavigation />
            <Toast config={toastConfig} position="bottom" />
          </PaperProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;

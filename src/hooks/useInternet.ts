import { useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { LABEL } from '../constant/constant';
import { ToastAlert } from '../utils/helperFunctions/CustomToast';

const useInternet = () => {
  const [isInternet, setIsInternet] = useState<boolean>(true);

  useEffect(() => {
    const handleConnectivityChange = (state: NetInfoState) => {
      // isConnected updates immediately when WiFi/Cellular is toggled
      // isInternetReachable can lag, so we fallback to isConnected if undefined
      if (state.isInternetReachable === null) {
        setIsInternet(!!state.isConnected);
      } else {
        setIsInternet(!!state.isConnected && state.isInternetReachable);
      }
    };

    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

    // Initial fetch
    NetInfo.fetch().then(handleConnectivityChange);

    return () => {
      unsubscribe();
    };
  }, []);

  // Display offline toast message
  const offlineToast = () => {
    ToastAlert({
      type: 'error',
      message: LABEL.YOU_ARE_OFFLINE,
    });
  };

  return {
    isInternet,
    offlineToast,
  };
};

export default useInternet;

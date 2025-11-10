import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { isArrayLength } from '../../utils/Validations';

type Props = {
  route: any;
  navigation: any;
};

const ImageViewerScreen = ({ route, navigation }: Readonly<Props>) => {
  const { images, selected } = route?.params ?? {};
  const [modalVisible, setModalVisible] = useState<boolean>(true);

  const imageUrls = isArrayLength(images)
    ? images?.map((uri: string) => ({ url: uri }))
    : [];

  const initialIndex = images?.indexOf(selected);

  // Handle hardware back
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (modalVisible) {
          setModalVisible(false); // close modal first
          navigation.goBack(); // then go back in navigation
          return true;
        }
        return false; // allow default behavior
      };

      const sub = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => sub.remove();
    }, [modalVisible, navigation]),
  );

  if (!modalVisible) return null;

  return (
    <View style={styles.container}>
      {/* <Modal visible transparent> */}
      <ImageViewer
        imageUrls={imageUrls}
        index={initialIndex}
        enableSwipeDown
        onSwipeDown={() => navigation?.goBack?.()}
        saveToLocalByLongPress={false}
      />
      {/* </Modal> */}
    </View>
  );
};

export default ImageViewerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

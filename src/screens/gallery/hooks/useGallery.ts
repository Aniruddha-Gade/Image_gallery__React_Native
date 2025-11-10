import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ImageType } from '../types/type';
import {
  clearAsyncImages,
  getAsyncImages,
  saveAsyncImages,
} from '../utils/helperFunctions';
import { Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { PATH } from '../../../constant/constant';
import { LABEL } from '../constant/constant';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { isArrayLength } from '../../../utils/Validations';

function useGallery() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<NativeStackNavigationProp>();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // initially, load images from async storage
  useEffect(() => {
    loadImages();
  }, []);

  // load images from async storage
  const loadImages = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const stored = await getAsyncImages();
      if (isArrayLength(stored)) {
        setImages(stored);
      }
    } catch (error) {
      console.log('Error loading images in useGallery:', error);
    } finally {
      if (isRefresh) setRefreshing(false);
      else setLoading(false);
    }
  };

  // pick multiple images from gallery
  const pickImages = async () => {
    try {
      setLoading(true);

      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 0,
      });

      if (result?.didCancel) {
        return;
      }

      if (!result.didCancel && result?.assets?.length) {
        const newImages = [
          ...images,
          ...result?.assets?.map(a => a?.uri),
        ] as ImageType[];

        setImages(newImages);
        await saveAsyncImages(newImages);
      }
    } catch (error) {
      console.log('Error picking images in useGallery:', error);
    } finally {
      setLoading(false);
    }
  };

  // delete image
  const deleteImage = async (uri: ImageType) => {
    try {
      setLoading(true);

      const filtered = images.filter(img => img !== uri);
      setImages(filtered);
      await saveAsyncImages(filtered);
    } catch (error) {
      console.log('Error deleting image in useGallery:', error);
    } finally {
      setLoading(false);
    }
  };

  // Alert for delete image
  const handleDeleteImage = (uri: ImageType) => {
    Alert.alert(LABEL.DELETE, LABEL.REMOVE_IMAGE, [
      { text: 'Cancel' },
      {
        text: 'OK',
        onPress: () => deleteImage(uri),
      },
    ]);
  };

  // on image press, navigate to image viewer
  const handleImagePress = (imgs: ImageType[], selected?: ImageType) => {
    navigation.navigate(PATH.DOC_PREVIEW, { images: imgs, selected });
  };

  // clear all images
  const clearImages = async () => {
    try {
      setLoading(true);

      await clearAsyncImages();
      setImages([]);
    } catch (error) {
      console.log('Error clearing images in useGallery:', error);
    } finally {
      setLoading(false);
    }
  };

  // Alert for clear all images
  const handleClearAsyncImages = async () => {
    Alert.alert('Clear All', LABEL.CONFRIM_CLEAR_ALL_IMAGES, [
      { text: 'Cancel' },
      {
        text: 'OK',
        onPress: clearImages,
      },
    ]);
  };

  // handle refresh
  const onRefresh = async () => {
    await loadImages(true);
  };

  return {
    images,
    loading,
    onRefresh,
    pickImages,
    refreshing,
    handleDeleteImage,
    handleImagePress,
    handleClearAsyncImages,
  };
}

export default useGallery;

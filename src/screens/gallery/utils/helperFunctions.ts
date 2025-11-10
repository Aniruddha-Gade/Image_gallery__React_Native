import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_KEY } from '../../../constant/constant';
import { ImageType } from '../types/type';

export const getAsyncImages = async () => {
  const stored = await AsyncStorage.getItem(ASYNC_KEY.GALLERY_IMAGES);
  if (stored) return JSON.parse(stored);
  return [];
};

export const saveAsyncImages = async (images: ImageType[]) => {
  await AsyncStorage.setItem(ASYNC_KEY.GALLERY_IMAGES, JSON.stringify(images));
};

export const deleteAsyncImage = async (uri: string) => {
  const stored = await getAsyncImages();
  const filtered = stored?.filter?.((img: string) => img !== uri);
  await saveAsyncImages(filtered);
  return filtered;
};

export const deleteAsyncImages = async (uris: string[]) => {
  const stored = await getAsyncImages();
  const filtered = stored?.filter?.((img: string) => !uris?.includes(img));
  await saveAsyncImages(filtered);
  return filtered;
};

export const clearAsyncImages = async () => {
  try {
    await AsyncStorage.removeItem(ASYNC_KEY.GALLERY_IMAGES);
  } catch (error) {
    console.log('Error clearing async images:', error);
  }
};

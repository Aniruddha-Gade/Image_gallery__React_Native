import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import useGallery from '../hooks/useGallery';
import ScreenLoader from '../../../components/common/ScreenLoader';
import { isTablet } from '../../../utils/Platform';
import Color from '../../../assets/Color';
import IconButton from '../../../components/common/IconButton';
import { ImageType } from '../types/type';
import NoDataComponent from '../../../components/common/NoDataComponent';
import { LABEL } from '../constant/constant';
import { isArrayLength } from '../../../utils/Validations';

const GalleryListing = () => {
  const {
    images,
    loading,
    onRefresh,
    refreshing,
    pickImages,
    handleDeleteImage,
    handleImagePress,
    handleClearAsyncImages,
  } = useGallery();

  const renderItem = ({ item }: { item: ImageType }) => {
    return (
      <TouchableOpacity
        onPress={() => handleImagePress(images, item)}
        onLongPress={() => handleDeleteImage(item)}
      >
        <Image source={{ uri: item }} style={styles.image} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <ScreenLoader loader={loading} />

      <FlatList
        data={images ?? []}
        keyExtractor={item => item?.uri}
        numColumns={3}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <NoDataComponent loading={loading} text={LABEL.NO_DATA} />
        }
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={10}
        removeClippedSubviews
        contentContainerStyle={styles.flatList}
      />

      {/* Clear All Button */}
      {isArrayLength(images) && (
        <IconButton
          onPress={handleClearAsyncImages}
          name="clear"
          icon="MaterialIcons"
          customStyles={styles.clearBtn}
        />
      )}

      {/* Add Image Button */}
      <IconButton
        onPress={pickImages}
        name="plus"
        icon="AntDesign"
        customStyles={styles.addBtn}
      />
    </View>
  );
};

export default GalleryListing;

const styles = StyleSheet.create({
  addImage: {
    position: 'absolute',
    margin: 10,
    right: isTablet ? 20 : 0,
    bottom: isTablet ? 20 : 0,
    backgroundColor: Color.primary,
    width: isTablet ? 80 : 60,
    height: isTablet ? 80 : 60,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  mainContainer: {
    flex: 1,
  },
  image: {
    width: isTablet ? 150 : 110,
    height: isTablet ? 150 : 110,
    margin: 5,
    borderRadius: 10,
  },
  fabContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  clearBtn: {
    position: 'absolute',
    right: 0,
    bottom: '10%',
    backgroundColor: Color.red,
  },
  addBtn: {
    position: 'absolute',
    right: 0,
    bottom: '1%',
  },
  scrollContent: {
    flexGrow: 1,
  },
  flatList: {
    paddingBottom: 50,
  },
});

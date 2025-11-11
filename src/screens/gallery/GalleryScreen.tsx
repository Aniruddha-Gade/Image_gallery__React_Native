import React from 'react';
import { View, StyleSheet } from 'react-native';
import Color from '../../assets/Color';
import GalleryListing from './components/GalleryListing';
import Typo from '../../components/common/Typo';
import { LABEL } from './constant/constant';

const GalleryScreen = () => {
  return (
    <View style={styles.container}>
      {/* title */}
      <Typo style={styles.title}>
        {LABEL.MY_GALLERY}
      </Typo>

      {/* listing */}
      <GalleryListing />
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.black_3,
    padding: 5,
    paddingHorizontal: 10,
  },
  image: {
    width: 110,
    height: 110,
    margin: 5,
    borderRadius: 10,
  },
  title :{
    fontSize : 25,
    fontWeight: 'bold',
    margin: 10,
    marginBottom: 15
  }
});

import React from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import { featuresData } from '../../assets/data/features';
import Color from '../../assets/Color';
import Typo from '../../components/common/Typo';
import { LABEL } from './constant/constant';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Typo style={styles.appName}>{featuresData.appName}</Typo>
      <Typo style={styles.description}>{featuresData.description}</Typo>

      <FlatList
        data={featuresData.features}
        keyExtractor={item => item?.id?.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Typo style={styles.title}>• {item?.title}</Typo>
            <Typo style={styles.detail}>{item?.detail}</Typo>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <Typo style={styles.footerText}>{LABEL.APP_BUILT_BY}</Typo>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.black,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  appName: {
    fontSize: 26,
    fontWeight: '900',
    color: Color.primary,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: Color.grey,
    textAlign: 'center',
    marginVertical: 10,
  },
  listContainer: {
    paddingVertical: 20,
  },
  card: {
    backgroundColor: Color.black_3,
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Color.white_1,
  },
  detail: {
    fontSize: 15,
    color: Color.white_2,
    marginTop: 5,
  },
  footer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
     color: Color.white_2,
  },
});

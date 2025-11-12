import { StyleSheet } from 'react-native';
import React from 'react';
import TextField from './TextField';
import Color from '../../assets/Color';

type Props = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const Searchbar = ({ searchQuery, setSearchQuery }: Readonly<Props>) => {
  return (
    <TextField
      placeholder="Search tasks..."
      value={searchQuery}
      style={styles.searchInput}
      onChangeText={setSearchQuery}
    />
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  searchInput: {
    padding: 10,
    width: '100%',
    color: Color.white_1,
  },
});

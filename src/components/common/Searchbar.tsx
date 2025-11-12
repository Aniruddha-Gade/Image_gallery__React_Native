import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import TextField from './TextField';
import Color from '../../assets/Color';
import { notEmpty } from '../../utils/Validations';
import { CustomIcon } from './CustomIcon';

type Props = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const Searchbar = ({ searchQuery, setSearchQuery }: Readonly<Props>) => {
  return (
    <View style={styles.container}>
      {/* Input field */}
      <TextField
        placeholder="Search tasks..."
        value={searchQuery}
        style={styles.searchInput}
        onChangeText={setSearchQuery}
      />

      {/* Cross icon inside input */}
      {notEmpty(searchQuery) && (
        <TouchableOpacity
          onPress={() => setSearchQuery('')}
          style={styles.clearIcon}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <CustomIcon icon="Octicons" name="x" color={Color.red} size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
  },
  searchInput: {
    padding: 10,
    paddingRight: 35, // space for the clear icon
    width: '100%',
    color: Color.white_1,
  },
  clearIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -15 }], // center vertically
  },
});

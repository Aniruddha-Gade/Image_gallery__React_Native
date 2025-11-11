import { Image, StyleSheet, View } from 'react-native';
import { isTablet } from '../../utils/Platform';
import { LABEL } from '../../constant/constant';
import FONT_FAMILY from '../../assets/FontFamily';
import Typo from './Typo';

function NoDataComponent({
  text = 'No Data Available',
  loading = false,
}: {
  text?: string;
  loading?: boolean;
}) {
  return (
    <View style={styles.emptyView}>
      {!loading && (
        <Image
          style={styles.image}
          source={require('../../assets/images/no-data.png')}
        />
      )}

      <Typo style={styles.text}>{loading ? LABEL.PLEASE_WAIT : text}</Typo>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 100,
  },
  emptyView: {
    height: 600,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: isTablet ? 24 : 16,
    fontWeight: '700',
    marginTop: 20
  },
  image: {
    width: isTablet ? 400 : 300,
    height: isTablet ? 300 : 200,
    resizeMode: 'cover',
    borderRadius: 20,
  },
});

export default NoDataComponent;

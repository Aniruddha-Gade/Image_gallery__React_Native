import { isTablet } from '../utils/Platform';

const FONT_FAMILY = {
  POPPINS_SEMIBOLD: 'Poppins-SemiBold',
  POPPINS_BOLD: 'Poppins-Bold',
  POPPINS_REGULAR: 'Poppins-Regular',
  POPPINS_MEDIUM: 'Poppins-Medium',
};

export const FONT_SIZE = isTablet ? 20 : 14;

export default FONT_FAMILY;

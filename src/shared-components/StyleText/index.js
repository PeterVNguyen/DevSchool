import React from 'react';
import { Text, } from 'react-native';
import PropTypes from 'prop-types';

import { Colors, } from '../../theme';
import Fonts from 'src/theme/Fonts';

const getCorrectFonts = (
  isBold: boolean,
  isItalic: boolean,
  isMedium: boolean,
  isSemiBold: boolean,
  isExtraBold: boolean
) => {
  switch (true) {
    case isItalic:
      return Fonts.Default.italic;
    case isBold:
      return Fonts.Default.bold;
    case isMedium:
      return Fonts.Default.medium;
    case isSemiBold:
      return Fonts.Default.semiBold;
    case isExtraBold:
      return Fonts.Default.extraBold;
    default:
      return Fonts.Default.regular;
  }
};

const getCorrectColor = ({
  color,
  dark,
  black,
  light,
  white,
  gray,
  grey,
  primary,
  accent,
}) => {
  if (color) return color;
  switch (true) {
    case dark || black:
      return '#000000';
    case gray || grey:
      return '#AAAAAA';
    case white:
      return '#FFFFFF';
    case primary:
      return Colors.primary;
    case accent:
      return Colors.accent;
    case light:
      return Colors.light;
    default:
      return '#4a4a4a';
  }
};

export default class StyledText extends React.Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    center: PropTypes.bool,

    // font family
    bold: PropTypes.bool,
    italic: PropTypes.bool,
    //Colors
    color: PropTypes.string,
    dark: PropTypes.bool,
    black: PropTypes.bool,
    light: PropTypes.bool,
    white: PropTypes.bool,
    gray: PropTypes.bool,
    grey: PropTypes.bool,
    primary: PropTypes.bool,

    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number,]).isRequired,
  };

  static defaultProps = {
    size: 14,
    style: {},
  };
  render() {
    const {
      children,
      style,
      size,
      center,
      bold,
      italic,
      medium,
      semiBold,
      extraBold,
      color,
      dark,
      black,
      light,
      white,
      gray,
      grey,
      primary,
      accent,
      ...textProps
    } = this.props;

    const _style = {
      fontSize: size,
      textAlign: center ? 'center' : 'left',
      fontFamily: getCorrectFonts(bold, italic, medium, semiBold, extraBold),
      color: getCorrectColor({
        color,
        dark,
        black,
        light,
        white,
        gray,
        grey,
        primary,
        accent,
      }),
    };
    return (
      <Text style={[_style, style,]} {...textProps}>
        {children}
      </Text>
    );
  }
}

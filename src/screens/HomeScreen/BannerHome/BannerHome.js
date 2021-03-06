import React, { Component, } from 'react';
import { View, StyleSheet, } from 'react-native';
import PropsType from 'prop-types';

import { Metrics, Colors, } from 'src/theme';
import { StyleText, } from 'src/shared-components';
export default class BannerHome extends Component {
  static propsType = {
    name: PropsType.string.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <StyleText medium size={20} color={'white'}>
            {'Hi ' + this.props.name}
          </StyleText>
          <StyleText size={15} color={'white'}>
            {'Promotions for you today'}
          </StyleText>
        </View>
        <View style={styles.view1} />
        <View style={styles.view2} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Colors.light,
  },
  wrapper: {
    // height: 70,
    width: '70%',
    padding: Metrics.getBaseUnitFactor(),
    alignItems: 'center',
    justifyContent: 'space-around',

    position: 'absolute',
    top: 35,

    borderRadius: 15,
    shadowOffset: { height: 3, width: 13, },
    elevation: 8,

    backgroundColor: Colors.primary,
  },
  view1: {
    height: 70,
    width: '100%',

    backgroundColor: Colors.light,
  },
  view2: {
    height: 35,
    backgroundColor: Colors.background,
  },
});

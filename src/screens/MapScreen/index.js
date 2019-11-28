import { Dimensions, } from 'react-native';
import { connect, } from 'react-redux';
import { Navigation, } from 'react-native-navigation';

import { Fonts, } from 'src/theme';
import { selectors, actions, } from 'src/stores';
import { dataFake, } from 'src/values';

import MapScreen from './MapScreen';
import ScreenIDs from '../ScreenIDs';

let { width, height, } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const mapStateToProps = (state) => {
  const longitude = selectors.global.getLongitude(state);
  const latitude = selectors.global.getLatitude(state);

  const region = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  return {
    region,
    longitude,
    latitude,
    dataFake,
  };
};

// const mapDispatchToProps = dispatch => ({
//   getLocation: () => dispatch(actions.global.setPositionUser())
// });

const mapDispatchToProps = (dispatch, { componentId, }) => {
  const getLocation = () => {
    dispatch(actions.global.setPositionUser());
  };
  const onPressPush = async (reponse) => {
    try {
      await Navigation.push(componentId, {
        component: {
          name: ScreenIDs.MarkerDetailScreen,
          passProps: {
            reponse,
          },
          options: {
            topBar: {
              title: {
                text: reponse.merchant.name,
                alignment: 'center',
                fontFamily: Fonts.Default.medium,
              },
            },
            bottomTabs: {
              visible: false,
              drawBehind: true,
              animate: true,
            },
          },
        },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  return {
    getLocation,
    onPressPush,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);

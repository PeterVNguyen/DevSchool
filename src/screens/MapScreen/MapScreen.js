import React, { Component, } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import Propstype from 'prop-types';

import { IconAssets, } from 'src/assets';
import { Metrics, } from 'src/theme';

let { width, height, } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 10.8215599; // Update me
const LONGITUDE = 106.7633488;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class MapScreen extends Component {
  static propsType = {
    region: Propstype.object.isRequired,
    dataShop: Propstype.object.isRequired,
    onPressPush: Propstype.func.isRequired,
    callback: Propstype.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { latitude, longitude, } = this.props;
    this.state = {
      markers: [],
      region: {
        latitude: typeof latitude == Number ? latitude : LATITUDE,
        longitude: typeof longitude == Number ? longitude : LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }

  _getIcon = (type) => {
    switch (type) {
      case 1:
        return IconAssets.Favorite;
      case 3:
        return IconAssets.Recommend;
      case 2:
      default:
        return IconAssets.Popular;
    }
    //popular, favorite, normal
  };

  _onCarouselItemChange = (index) => {
    const { dataShop, } = this.props;

    let location = dataShop[index];

    this._map.animateToRegion({
      latitude: location.coordinate[1],
      longitude: location.coordinate[0],
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });

    this.state.markers[index].showCallout();
  };

  _onMarkerPress = (location, index) => {
    this._map.animateToRegion({
      latitude: location.coordinate[1],
      longitude: location.coordinate[0],
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });

    this._carousel.snapToItem(index);
  };

  _renderItem = ({ item, }) => {
    const { onPressPush, } = this.props;
    return (
      <TouchableOpacity onPress={() => onPressPush(item)}>
        <Image
          style={styles.cardCarousel}
          source={{ uri: item.merchant.promotion_img_path, }}
        />
      </TouchableOpacity>
    );
  };

  _renderMarker = () => {
    const { dataShop, } = this.props;
    return dataShop.map((marker, index) => (
      <Marker
        ref={(ref) => (this.state.markers[index] = ref)}
        key={marker.id}
        coordinate={{
          latitude: marker.coordinate[1],
          longitude: marker.coordinate[0],
        }}
        title={marker.merchant.name}
        onPress={() => this._onMarkerPress(marker, index)}
        // icon={this._getIcon(marker.id)}
      >
        <Image
          source={this._getIcon(marker.id)}
          key={marker.id}
          style={{ height: 25, width: 25, }}
        />
      </Marker>
    ));
  };
  //   <Callout>
  //   <StyleText>{marker.merchant.name}</StyleText>
  // </Callout>

  render() {
    const { dataShop, } = this.props;
    return (
      <View style={styles.wrapper}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={(map) => (this._map = map)}
          style={styles.map}
          initialRegion={this.state.region}
          showsUserLocation
          showsMyLocationButton
        >
          {this._renderMarker()}
        </MapView>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          containerCustomStyle={styles.carousel}
          data={dataShop}
          renderItem={this._renderItem}
          sliderWidth={width}
          itemWidth={300}
          onSnapToItem={(index) => this._onCarouselItemChange(index)}
          layout={'default'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  carousel: {
    position: 'absolute',
    bottom: Metrics.getBaseUnitFactor(),
  },
  cardCarousel: {
    height: 150,
    width: '100%',

    borderRadius: 10,
  },
});

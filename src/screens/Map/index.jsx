import { useState } from "react";
import { Image } from "react-native";

import MapView from "react-native-maps";
import { Content, Screen, ViewFilter } from "./styles";
// import database from "@react-native-firebase/database";
// import analytics from "@react-native-firebase/analytics";
// import auth from "@react-native-firebase/auth";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// import Icon from "react-native-vector-icons/MaterialIcons";
// import i18n from "../../i18n";
// import AppState from "../../api/AppState";
// import AwesomeAlert from "../../utils/AwesomeAlert";

// const eventRef = database().ref("events");

export function MapLocation() {
  // this.state = {
  //   markers: [],
  //   userPosition: {
  //     lat: -21.9418874,
  //     lng: -42.2710501,
  //   },

  const [userPosition, setUserPosition] = useState({
    lat: -21.9418874,
    lng: -42.2710501,
    markers: [],
  });
 
  //   analytics().logScreenView({
  //     screen_name: "MapScreen",
  //   });
  //   this.listEventsInMarker();
  // }

  // openEventDetails = data => {
  //   analytics().logEvent("OpenEventDetails", data);
  //   this.props.navigation.navigate("EVENT_DETAILS_SCREEN", data);
  // };

  // listEventsInMarker = () => {
  //   eventRef.once("value").then(snapshot => {
  //     const data = snapshot.val();

  //     for (i = 0; i < Object.keys(data).length; i++) {
  //       let value = Object.values(data)[i];
  //       if (Object.keys(data).length > 0) {
  //         var dataObject = {
  //           coordinates: {
  //             latitude: value.eventLocation.lat,
  //             longitude: value.eventLocation.lng,
  //           },
  //           allData: value,
  //         };
  //         var temp = this.state.markers;
  //         temp.push(dataObject);

  //         this.setState({
  //           markers: temp,
  //         });
  //       } else {
  //         this.setState({
  //           coordinates: {
  //             latitude: value.eventLocation.lat,
  //             longitude: value.eventLocation.lng,
  //           },
  //           allData: value,
  //         });
  //       }
  //     }
  //   });
  // };

  // const { userPosition } = this.state;
  return (
    <Screen>
      <Content>
        <MapView
          style={{ width: "100%", height: "100%" }}
          showsUserLocation={true}
          showsMyLocationButton={false}
          zoomEnabled={true}
          region={{
            latitude: -19.794347427358744,
            longitude: -43.93159329148726,
            latitudeDelta: 0.0,
            longitudeDelta: 1.0,
          }}
        >
          {/* {this.state.markers.map(marker => ( */}
          <MapView.Marker
            coordinate={{
              latitude: -19.794347427358744,
              longitude: -43.93159329148726,
            }}
            onPress={() => {}}
            // this.openEventDetails(marker.allData)
          >
            <Image
              source={require("../../assets/images/map-marker.png")}
              style={{ width: 36, height: 36 }}
              resizeMode="contain"
            />
          </MapView.Marker>
          {/* ))} */}
        </MapView>
        <ViewFilter>{/* add search here*/}</ViewFilter>
      </Content>
    </Screen>
  );
}

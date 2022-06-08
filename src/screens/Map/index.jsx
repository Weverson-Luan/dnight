import { useState } from "react";
import { Image } from "react-native";

import MapView from "react-native-maps";
import { Content, Screen, ViewFilter } from "./styles";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// import Icon from "react-native-vector-icons/MaterialIcons";
// import i18n from "../../i18n";
// import AppState from "../../api/AppState";
// import AwesomeAlert from "../../utils/AwesomeAlert";

// const eventRef = database().ref("events");

export function MapLocation() {

  const [userPosition, setUserPosition] = useState({
    lat: -21.9418874,
    lng: -42.2710501,
    markers: [],
  });

  const [ marked, setMarked] = useState({
    lat: -19.791132623631036,
    lng: -43.94244426257861, 
    
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
            latitudeDelta: 0.005922,
            longitudeDelta: 0.00421,
          }}
        >
          {/* FIRST MARKED*/}
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
         

            {/* TWO MARKED*/ }
            <MapView.Marker
            coordinate={{
              latitude:  -19.795999378439873,
              longitude: -43.93186074142118
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

            {/* TWO TREE*/ }
            <MapView.Marker
            coordinate={{
              latitude:  -19.794737522266256,
              longitude:  -43.93189292789567
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

           {/* TWO FOUR*/ }
           <MapView.Marker
            coordinate={{
              latitude: -19.793859264493562,
              longitude: -43.93226843713322
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
        </MapView>
        <ViewFilter>{/* add search here*/}</ViewFilter>
      </Content>
    </Screen>
  );
}

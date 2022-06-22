import { useState, useEffect } from "react";
import { Image } from "react-native";

//maps
import MapView from "react-native-maps";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

//google-firebase
import database from '@react-native-firebase/database';

//async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";


import {
   Content,
   Screen, 
   ViewFilter 
} from "./styles";


export function MapLocation({navigation}) {
  const [userPositionActual, setUserPositionActual] = useState({
    coords: {
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 1,
      heading: 0,
      latitude: 0,
      longitude: 0,
      speed: 0,
    },
    mocked: false,
    timestamp: 0,
  });
  const [ marked, setMarked] = useState([]);
  const eventRef = database().ref('events');

  const listEventsInMarker = () => {
    eventRef.once('value').then((snapshot) => {
      const data = snapshot.val();

      let array = marked
      for (const [_key,value] of Object.entries(data)) {
        array.push(value)
        setMarked([...marked,array])
      };    
    });
  };

  /**
   * NAVIGATION PASSED PARAMS
   */
  const openEventDetails = (params)=> {
    navigation.navigate("EventsDetails", {
      event: params
    });
  }

  useEffect(()=> {
    listEventsInMarker();

    /**
     * SEACRH POSITION
     */
    const handlePositionLocationActual = async ()=> {
      const keyLocation = "@positionActual";
      const location = await AsyncStorage.getItem(keyLocation);
      const transformLocation = JSON.parse(location);
      setUserPositionActual(transformLocation);
    };

    handlePositionLocationActual();
  }, []);

  return (
    <Screen>
      <Content>
        <MapView
          style={{ width: "100%", height: "100%" }}
          showsUserLocation={true}
          showsMyLocationButton={false}
          zoomEnabled={true}
          region={{
            latitude: userPositionActual?.coords?.latitude, 
            longitude: userPositionActual?.coords.longitude,
            latitudeDelta: 0.005922,
            longitudeDelta: 0.00421,
          }}
        >
           {/* FIRST MARKED*/}
          
          {
            marked.map((events)=> (
              <>
                {
                  events?.eventLocation?.lat ?
                  <MapView.Marker 
                    key={events.eventDate}
                    coordinate={{
                      latitude:  events?.eventLocation?.lat,
                      longitude: events?.eventLocation?.lng,
                    }}
                   onPress={() => openEventDetails(events)}>
                  <Image
                    source={require("../../assets/images/map-marker.png")}
                    style={{ width: 36, height: 36 }}
                    resizeMode="contain"
                   />
                  </MapView.Marker>   
                  :
                  null
                }
              </>
            ))
          }
        </MapView>
        <ViewFilter>{/* add search here*/}</ViewFilter>
      </Content>
    </Screen>
  );
}

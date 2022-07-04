import React, { useState, useEffect } from 'react'
import { Share, View, Text, Image, ImageBackground, ScrollView, Linking } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { TouchableRipple } from 'react-native-paper';

//mapView
import MapView from 'react-native-maps';

//async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";


//icons
import Icon from 'react-native-vector-icons/MaterialIcons';

//i18n
import i18n from '../../i18n'

//styled-components
import { 
  Screen,
  Description,
  CircleButton,
  Name,
  scrollView,
  imageBackground,
  touchableRipple,
  content,
  contentMain,
  contentLocation,
  contentFooter,
  contentMap,
  TitleDescription,
  TitleEventAbout,
  contentText,
  TitleContact,
  TitlePhone,
  contentMapView,
  titleLocaTion,
  imageMap,
  circleButton,
  mapView
} from "./styles";
import { PrimaryButton } from '../../components/PrimaryButton';

export function EventsDetails({ navigation }){
 const [state, setState] = useState({
  latitude: '',
  longitude: '',
  favorite: false,
  category: '',
 });
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

  const route = useRoute();
  const { event } = route.params;
  console.log("UP", event?.eventLocation?.lat)

  /**
   * Compartilhamento de Evento
   */
  const shareEvent = () => {
    Share.share({
      message: i18n.t('labels.share.message', {
        name: event.eventName,
        date: event.eventDate,
        local: event.eventCity,
      }),
    })
  }

  useEffect(()=> {
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

  return(
    <Screen>
    <ScrollView showsVerticalScrollIndicator={false} style={scrollView}>
      <ImageBackground source={{ uri: event.eventImage }} style={imageBackground}>
        <View style={content}>
          <TouchableRipple borderless={true} onPress={() => { navigation.goBack() }} rippleColor="rgba(255, 255, 255, .32)" style={touchableRipple }>
            <Icon name='arrow-back' size={30} color={'white'} />
          </TouchableRipple>
        </View>
       
      </ImageBackground >

      <View style={contentMain}>
        <Name>{event.eventName}</Name>
        <View style={contentLocation}>
          <Icon name='location-on' size={20} color={'gray'} />
          <Description style={{ left: 10 }}>
            {event.eventCity} - {event.eventCategory}
          </Description>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', top: 5 }}>
          <Icon name='event' size={20} color={'gray'} />
          <Description style={{ left: 10 }}>
            {event.eventDate} - {event.eventTime}h
          </Description>
        </View>
      </View>

      <View style={contentMain}>
      <PrimaryButton
          title={i18n.t("buttons.buyTicket").toUpperCase()}
          color={"primary"}
          size={"lg"}
          radius={8}
          height={45}
          onPress={()=>alert("l")}
        />
      </View>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginHorizontal: 15 }}>
        <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(146, 146, 146, 0.6)' }} />
      </View>

      <View style={contentMap}>
        <View>
          <Text style={TitleDescription}>Descrição</Text>
          <Text style={TitleEventAbout}>{event.eventAbout}</Text>
        </View>

        <View style={contentText}>
          <Text style={TitleContact}>Contato</Text>
          <Text style={TitlePhone}>{event.eventPhone}</Text>
        </View>

        <View style={contentMapView}>
          <Text style={titleLocaTion}>Local</Text>

          {
             event?.eventLocation?.lat ?
             <MapView
             style={mapView}
             showsUserLocation={true}
             showsMyLocationButton={false}
             zoomEnabled={true}
             region={{
              latitude: event?.eventLocation?.lat, 
              longitude: event?.eventLocation?.lng,
              latitudeDelta: 0.005922,
              longitudeDelta: 0.00421,
             }}
           >
             <MapView.Marker
               coordinate={{
                 latitude: event?.eventLocation?.lat,
                 longitude: event?.eventLocation?.lng,
               }}
               title={event.eventName}
               description={event.eventCity}
             >
              <Image
               source={require('../../assets/images/map-marker.png')}
               style={imageMap}
               resizeMode="contain"
             />
             </MapView.Marker>
           </MapView>
             :
             null
          }
        </View>
      </View>

      <View style={contentFooter}>
        <CircleButton onPress={()=> shareEvent()}>
          <Icon name='share' size={20} color={'gray'} />
        </CircleButton>
        <CircleButton onPress={console.log("pi2")} style={circleButton}>
          <Icon
            name={!state.favorite ? 'bookmark-border' : 'bookmark'}
            size={20}
            color={'gray'}
          />
        </CircleButton>
      </View>
    </ScrollView>
  </Screen>
  )
}


import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, ImageBackground } from "react-native";
import Carousel from "react-native-snap-carousel";

import { Heading, Spinner } from "native-base";

//google-firebase
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

// icons-vector-icons
import Icon from "react-native-vector-icons/MaterialIcons";

// i18n
import i18n from "../../i18n";

//commons
import { Styles } from "../../common/styles";

//styled-components
import {
  Container,
  Content,
  FeaturedEventContainer,
  imageBackground,
  imageText,
  imageText2,
  imageView,
  ViewCarousel
} from "./styles";

export function ListEvents({ navigation ,route}) {
const {eventType} = route.params
  
  const [dataEvent, setDataEvent] = useState({
    chatRooms: [],
    loading: true,
    loadingFeatureEvents: true,
    featureEvents: [
    
    ],
    featuredEvent: [],
    allEvents: [],
    coordinates: {
      lat: 0,
      lng: 0,
    },
    eventDistance: 0,
  });
  const eventsRef = database().ref('events');

 const getDistance = (lat1, lon1, lat2, lon2) => {
  const deg2rad = deg => {
      return deg * (Math.PI / 180)
    }
    var R = 6371 // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1) // deg2rad below
    var dLon = deg2rad(lon2 - lon1)
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = R * c // in KM

    return Math.floor(d)
  }
  useEffect(()=> {
    eventsRef.once('value')
    .then(snapshot => {
      const events_list_id = snapshot.val();
      for (i = 0; i < Object.keys(events_list_id).length; i++) {
        eventsRef.child(Object.keys(events_list_id)[i]).once('value').then((snapshot) => {
          const data = snapshot.val();
          const eventsObject = {
            eventName: data.eventName,
            eventDate: data.eventDate,
            eventTime: data.eventTime,
            eventAbout: data.eventAbout,
            eventCity: data.eventCity,
            eventLocation: data.eventLocation,
            eventCategory: data.eventCategory,
            eventImage: data.eventImage,
            eventPhone: data.eventPhone,
            eventTicket: data.eventTicket,
            eventFeatured: data.eventFeatured,
            eventChatID: data.eventChatID,
            eventChild: snapshot.key
          };

          if (eventType == data.eventCategory) {
            if (getDistance(dataEvent.coordinates.lat, dataEvent.coordinates.lng, data.eventLocation.lat, data.eventLocation.lng) >= dataEvent.eventDistance) {
              
              if (data.eventFeatured) {
                let temp = dataEvent.featureEvents
                temp.push(eventsObject)
                setDataEvent({
                  featureEvents: temp,
                })
              } else {
                let temp = this.state.allEvents
                temp.push(eventsObject)

                setDataEvent({
                  allEvents: temp,
                })
              }
              let temp = this.state.featureEvents
              temp.push(eventsObject)

              setDataEvent({
                featureEvents: temp,
              })
            }
          }

        
        }).catch((error) => {
          AwesomeAlert.show(error)
        })
      }
    })
    .catch((error)=> console.log("error listing events", error))
  }, [])

  useEffect(()=> {
    auth().onAuthStateChanged((user) => {
      if (user) {
        database().ref('users').child(user.uid).on('value', function (snapshot) {
        let  userData = snapshot.val();
      setDataEvent({...dataEvent,
        coordinates: {
          lat: userData.location.lat,
          lng: userData.location.lng,
        },
        eventDistance:userData.eventDistance
      })
        });
       };
    });
  }, [])

  return (
    <Container>
      <Content>
        {/* Featured Events */}
        <Heading
          size="md"
          adjustsFontSizeToFit
          style={{ color: Styles.Color.PRIMARY_DARK, marginBottom: 15, paddingTop: 15 }}
        >
          {i18n.t("labels.all_events")}
        </Heading>
        <FeaturedEventContainer>
          {dataEvent?.loadingFeatureEvents && (
            <Spinner
              color="white"
              size={"sm"}
              style={{ position: "absolute", alignSelf: "center" }}
            />
          )}

          <Carousel
            data={dataEvent?.featureEvents}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity 
                  activeOpacity={0.9}
                  onPress={()=> {
                    navigation.navigate("EventsDetails", {
                      event: item
                    })
                  }}
                >
                  <ViewCarousel>
                    <ImageBackground
                      borderRadius={20}
                      source={{ uri: item.eventImage }}
                      style={imageBackground}
                    >
                      <View style={imageView}>
                        <Text style={imageText}>{item.eventName}</Text>

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Icon
                            name="location-on"
                            size={18}
                            color={Styles.Color.PRIMARY_DARK}
                          />
                          <Text style={imageText2}>{item.eventCity}</Text>
                        </View>
                      </View>
                    </ImageBackground>
                  </ViewCarousel>
                </TouchableOpacity>
              );
            }}
            sliderWidth={Styles.Metrics.WIDTH - 40}
            itemWidth={Styles.Metrics.WIDTH - 40}
            autoplay
            layout="tinder"
          />
        </FeaturedEventContainer>
        <Heading
          size="md"
          adjustsFontSizeToFit
          style={{
            color: Styles.Color.PRIMARY_DARK,
            marginTop: 30,
            marginBottom: 15,
          }}
        >
          {i18n.t("labels.featured_event")}
        </Heading>
        <FeaturedEventContainer>
          {dataEvent?.loadingFeatureEvents && (
            <Spinner
              color="white"
              size={"sm"}
              style={{ position: "absolute", alignSelf: "center" }}
            />
          )}

          <Carousel
            data={dataEvent?.featureEvents}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity activeOpacity={0.9}>
                  <ViewCarousel>
                    <ImageBackground
                      borderRadius={20}
                      source={{ uri: item.eventImage }}
                      style={imageBackground}
                    >
                      <View style={imageView}>
                      <Text style={imageText}>{item.eventName}</Text>

                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Icon
                            name="location-on"
                            size={18}
                            color={Styles.Color.PRIMARY_DARK}
                          />
                           <Text style={imageText2}>{item.eventCity}</Text>
                        </View>
                      </View>
                    </ImageBackground>
                  </ViewCarousel>
                </TouchableOpacity>
              );
            }}
            sliderWidth={Styles.Metrics.WIDTH - 40}
            itemWidth={Styles.Metrics.WIDTH - 40}
            autoplay
            layout="tinder"
          />
        </FeaturedEventContainer>
      </Content>
    </Container>
  );
}

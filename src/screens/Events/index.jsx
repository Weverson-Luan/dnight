import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
//google-firebase
import database from '@react-native-firebase/database';

//components
import { CardSpotlight } from "../../components/CardSpotlight";
import { HeaderArrow } from "../../components/HeaderArrow";

//mocks
import { events } from "../../mocks/events";
import { Title, Wrapper, WrapperCardSpotlight } from "./styles";

export function Events(){
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
          if(data.eventFeatured){
            dataEvent.featureEvents.push(eventsObject)
          }
        
        }).catch((error) => {
          AwesomeAlert.show(error)
        })
      }
    })
    .catch((error)=> console.log("error listing events", error))
  }, [])

  return( 
      <> 
        <HeaderArrow />
          <Wrapper>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={events}
              keyExtractor={item => item.id}
              renderItem={({item})=> (
                <WrapperCardSpotlight>
                  <Title>Eventos em destaque</Title>
                  <CardSpotlight data={item}/>
                </WrapperCardSpotlight>
              )} 
            />
          </Wrapper>
      </>
  )
}
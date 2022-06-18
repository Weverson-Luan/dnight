//icons
import { useEffect, useState } from "react";
import Entypo from "react-native-vector-icons/Entypo";

//google-firebase
import database from '@react-native-firebase/database';

//commons
import { Styles } from "../../common/styles";

//styles
import { 
  Wrapper, 
  Image, 
  WrapperImage, 
  WrapperSpotlightDesc, 
  TextSpotlightText,
  WrapperLocation,
  TextSpotlightLocation, 
} from "./styles";


export function CardSpotlight({data}){
  const [dataa, setData] = useState([])
  useEffect(()=> {
    database()
    .ref('/events')
    .once('value')
    .then(snapshot => {
      const events_list_id = snapshot.val();
      const i = 0;
      // setData(data)
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
      }
    })
    .catch((error)=> console.log("error listing events", error))
  }, [])

  return(
    <Wrapper>
      <WrapperImage>
        <Image source={{ uri: data.img}}/>
      </WrapperImage>
      <WrapperSpotlightDesc>
        <TextSpotlightText>{data.eventName}ol</TextSpotlightText>
        <WrapperLocation>
          <Entypo name="location-pin" size={18} color={Styles.Color.PRIMARY_DARK} />
          <TextSpotlightLocation>{data.description}kk</TextSpotlightLocation>
        </WrapperLocation>
      </WrapperSpotlightDesc>
    </Wrapper>
  )
}
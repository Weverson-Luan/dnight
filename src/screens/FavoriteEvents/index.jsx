import { useState, useEffect } from "react";
import { FlatList } from 'react-native';
import { View, Text } from "native-base";

//google-firebase
import database from '@react-native-firebase/database';

//icons-vector-icons
import Icon from 'react-native-vector-icons/MaterialIcons';

//styles
import { Styles } from '../../common/styles';


//styled-components
import { 
  ContentList,
  Item,
  Content,
  Image,
  Title,
  SimpleText,
  InputSearch,
  //css-native
  filter
} from "./styles";

export function FavoriteEvents(){
  const [ events, setEvents] = useState([]);

  /**
   * BUSCAR POR EVENTOS FAVORITOS
   */

  useEffect(()=> {
    const handleEventSave = async () => {
      database()
      .ref(`/favorites`)
      .once('value')
      .then((snapshot)=> {
        const data = snapshot.val();
        let array = events;
        for (const [_key,value] of Object.entries(data)) {
          array.push(value)
          setEvents([...events,array])
        };    
      })
      .catch((error)=> console.log("ERROR EM BUSCAR EVENTO SALVO", error))
    }

    handleEventSave();
  }, [])
  return(
    <View>
      <Text>Eventos Favoritos</Text>
      <ContentList>
      <FlatList
        contentContainerStyle={{ paddingBottom: 50 }}
        data={events}
        keyExtractor={item => item.user_id}
        renderItem={({ item, index }) => {
          return (
            <Item
              activeOpacity={0.7}
              key={index}
              onPress={() => {
                console.log(item)
              }}
            >
              <View>
                <Image source={{ uri: item.eventImage }} />
              </View>
              <Content>
                <View>
                  <Title>{item.eventName}</Title>
                  <View style={filter}>
                    <Icon name='location-on' size={15} color={Styles.Color.PRIMARY_DARK} />
                    <SimpleText>{item.eventCity}</SimpleText>
                  </View>
                </View>
                <View>
                  <View style={filter}>
                    <Icon name='event' size={15} color={Styles.Color.PRIMARY_DARK} />
                    <SimpleText>{item.eventDate}</SimpleText>
                  </View>
                </View>
              </Content>
            </Item>
          )
        }}
      />
    </ContentList>
      
    </View>
  )
}
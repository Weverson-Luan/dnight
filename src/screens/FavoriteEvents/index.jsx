import { useState, useEffect } from "react";
import { FlatList } from 'react-native';
import { View, Text } from "native-base";

//google-firebase
import database from '@react-native-firebase/database';

//icons-vector-icons
import Icon from 'react-native-vector-icons/MaterialIcons';

//styles
import { Styles } from '../../common/styles';

import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const [state, setState] =useState( {
    favoriteList: [],
  })

  /**
   * BUSCAR POR EVENTOS FAVORITOS
   */

   const handleEventSave = async () => {
    const user_id = await AsyncStorage.getItem(process.env.USER_ID);
    console.log("ESSE E O ID DO USUÁRIO DO EVENTO", user_id)
    database()
    .ref(`/favorites`)
      .once('value')
      .then(snapshot => {
        var id = snapshot.val()
        for (var i = 0; i < Object.keys(id).length; i++) {
          database()
            .ref(`/favorites`)
            .child(Object.keys(id)[i])
            .once('value')
            .then(value => {
              const response = value.val()
              var dataObject = {
                id: value.key,
                user_id: response.user_id,
                title: response.eventName,
                image: response.eventImage,
                date: response.eventDate
                  .split('-') 
                  .reverse() 
                  .join('/'),
                local: response.eventCity,
              }

              var temp = state.favoriteList;
              temp.push(dataObject)
              const novaArray = temp.filter(event  => event.user_id === user_id)
              setState({
                favoriteList: novaArray,
              })
            })
        }
      })
      .catch(error => {
       // console.error('Error => ', error)
      })
  }

  useEffect(()=> {
    handleEventSave();
  }, [])
  return(
    <View>
      <Text>Eventos Favoritos</Text>
      <ContentList>
      <FlatList
        contentContainerStyle={{ paddingBottom: 50 }}
        data={state.favoriteList}
        keyExtractor={item => item.id}
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
                <Image source={{ uri: item.image }} />
              </View>
              <Content>
                <View>
                  <Title>{item.title}</Title>
                  <View style={filter}>
                    <Icon name='location-on' size={15} color={Styles.Color.PRIMARY_DARK} />
                    <SimpleText>{item.local}</SimpleText>
                  </View>
                </View>
                <View>
                  <View style={filter}>
                    <Icon name='event' size={15} color={Styles.Color.PRIMARY_DARK} />
                    <SimpleText>{item.date}</SimpleText>
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
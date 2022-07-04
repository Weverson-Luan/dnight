import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

//google-firebase
import database from '@react-native-firebase/database';

//icons-vector-icons
import Icon from 'react-native-vector-icons/MaterialIcons';

//styles
import { Styles } from '../../common/styles';

//mocks
import { events } from "../../mocks/list-events";

//styled-components
import { 
  Container,
  ViewFilter,
  SearchIcon,
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

export function Filter(){
  const [filterEvents, setFilterEvents] = useState([]);
  const [filterEventsOriginal, _] = useState(filterEvents);

  const eventRef = database().ref('events');

  /**
   * FAZENDO PESQUISA DE EVENTOS.
   * @param {*} textEvent 
   */
  const search = (textEvent) => {
    if(textEvent){
      const arrayNew = JSON.parse(JSON.stringify(filterEventsOriginal));
      const newDate =  arrayNew.filter((event)=> {
      const itemData = JSON.stringify(event)
               ? JSON.stringify(event).toLowerCase()
               : ''.toUpperCase();
             const textData = textEvent.toLowerCase();
             return itemData.indexOf(textData) > -1;
       });
       setFilterEvents(newDate);
    };
  }

  useEffect(()=> {
    
  const handleListAllEvents= () => {
    eventRef.once('value').then((snapshot) => {
      const data = snapshot.val();

      let array = filterEvents;
      for (const [_key,value] of Object.entries(data)) {
        array.push(value)
        setFilterEvents([...filterEvents,array])
      };    
    });
  };

  handleListAllEvents();
  },[])
  return(
    <Container>
    <ViewFilter>
      <SearchIcon><Icon name='search' size={28} color={'#a9a9a9'} /></SearchIcon>
      <InputSearch
         onChangeText={(text)=>search(text)}
       />
    </ViewFilter>

    <ContentList>
      <FlatList
        contentContainerStyle={{ paddingBottom: 50 }}
        data={filterEvents}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => {
          return (
            <Item
              activeOpacity={0.7}
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
  </Container>
  )
}
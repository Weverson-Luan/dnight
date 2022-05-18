import React from 'react';
import { FlatList, View } from 'react-native';

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
  return(
    <Container>
    <ViewFilter>
      <SearchIcon><Icon name='search' size={28} color={'#a9a9a9'} /></SearchIcon>
      <InputSearch
       />
    </ViewFilter>

    <ContentList>
      <FlatList
        contentContainerStyle={{ paddingBottom: 50 }}
        data={events}
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
  </Container>
  )
}
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

//components
import { GridContent } from '../../components/GridContent';

//mocks
import { data } from "../../mocks/data-explorer";

//styled-components
import {
  Container,
  Welcome,
  Content
} from "./styles";

export function Explorer(){

  const openEvents = ()=> {
    navigation.navigate('LIST_EVENTS_SCREEN', { eventType: item})
  };
  
  return(
    <Container style={{ paddingTop: 25, backgroundColor: '#f5f5f5' }}>
      <Welcome>Bem-vindo(a) ao explorador</Welcome>
    <Content>
      <FlatGrid
        style={{height: '100%'}}
        itemDimension={130}
        data={data}
        horizontal={false}
        renderItem={({ item }) => 
        <TouchableOpacity activeOpacity={0.9} onPress={() => openEvents(item.type)}> 
          <GridContent 
          itemBg={item.background} 
          itemTitle={item.name} 
          itemDescription={item.description} />
        </TouchableOpacity>
          }
      />
    </Content>
  </Container>
  )
}
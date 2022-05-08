import { FlatList } from "react-native";

//components
import { CardSpotlight } from "../../components/CardSpotlight";
import { HeaderArrow } from "../../components/HeaderArrow";

//mocks
import { events } from "../../mocks/events";
import { Title, Wrapper, WrapperCardSpotlight } from "./styles";

export function Events(){

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
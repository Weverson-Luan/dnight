import React, { useState } from 'react';
import { TouchableOpacity, Text, View, ImageBackground } from 'react-native';
// import Carousel from 'react-native-snap-carousel'

import { Heading, Spinner } from 'native-base';

// icons-vector-icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// i18n
import i18n from '../../i18n';

//commons
import { Styles } from '../../common/styles';


//styled-components
import { 
  Container,
  Content,
  FeaturedEventContainer,
} from "./styles";


export function ListEvents(){
  const [loadingFeatureEvents, setLoadingFeatureEvents] = useState(true);

  const state = {
    chatRooms: [],
    loading: true,
    loadingFeatureEvents: true,
    featureEvents: [],
    featuredEvent: [],
    allEvents: [],
    coordinates: {
      lat: 0,
      lng: 0
    },
    eventDistance: 0,
  }
  return(
    <Container>
      <Container
        style={{
          paddingTop: 5,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Content>
          {/* Featured Events */}

          <Heading size='md' adjustsFontSizeToFit style={{ color: Styles.Color.PRIMARY_DARK, marginBottom: 15 }}>
            {i18n.t('labels.featured_event')}
          </Heading>
          <FeaturedEventContainer>
            {loadingFeatureEvents && (
              <Spinner
                color="white"
                size={'sm'}
                style={{ position: 'absolute', alignSelf: 'center' }}
              />
            )}

            {/* <Carousel
              data={[]}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                  >
                    <View
                      style={{ height: '100%', justifyContent: 'flex-end', alignItems: 'center' }}
                    >
                      <ImageBackground
                        borderRadius={20}
                        source={{ uri: item.eventImage }}
                        style={{
                          width: '100%',
                          height: '100%',
                          alignItems: 'center',
                          justifyContent: 'flex-end'
                        }}
                      >
                        <View
                          style={{
                            borderRadius: 10,
                            margin: 15,
                            paddingHorizontal: 6,
                            paddingVertical: 8,
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            width: Styles.Metrics.WIDTH - 80
                          }}
                        >
                          <Text
                            style={{
                              color: Styles.Color.PRIMARY_DARK,
                              fontSize: 18,
                              shadowColor: '#000',
                              shadowOffset: { width: 0.8, height: 0.8 },
                              shadowOpacity: 1,
                              shadowRadius: 3,
                              marginBottom: 5,
                              fontWeight: 'bold',
                              elevation: 5,
                            }}
                          >
                            kkkk
                          </Text>

                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='location-on' size={18} color={Styles.Color.PRIMARY_DARK} />
                            <Text
                              style={{
                                color: Styles.Color.PRIMARY_DARK,
                                fontSize: 16,
                                shadowColor: '#000',
                                shadowOffset: { width: 0.8, height: 0.8 },
                                shadowOpacity: 1,
                                shadowRadius: 3,
                                elevation: 5,
                              }}
                            >
                           kkkk
                            </Text>
                          </View>
                        </View>
                      </ImageBackground>

                    </View>
                  </TouchableOpacity>
                )
              }}
              sliderWidth={Styles.Metrics.WIDTH - 40}
              itemWidth={Styles.Metrics.WIDTH - 40}
              autoplay
              layout='tinder'
            /> */}
          </FeaturedEventContainer>


          <Heading size='md' adjustsFontSizeToFit style={{ color: Styles.Color.PRIMARY_DARK, marginTop: 30, marginBottom: 15 }}>
            {i18n.t('labels.featured_event')}
          </Heading>
       
          <FeaturedEventContainer>
            {loadingFeatureEvents && (
              <Spinner
                color="white"
                size={'sm'}
                style={{ position: 'absolute', alignSelf: 'center' }}
              />
            )}

            {/* <Carousel
              data={state.allEvents}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                  >
                    <View
                      style={{ height: '100%', justifyContent: 'flex-end', alignItems: 'center' }}
                    >
                      <ImageBackground
                        borderRadius={20}
                        source={{ uri: item.eventImage }}
                        style={{
                          width: '100%',
                          height: '100%',
                          alignItems: 'center',
                          justifyContent: 'flex-end'
                        }}
                      >
                        <View
                          style={{
                            borderRadius: 10,
                            margin: 15,
                            paddingHorizontal: 6,
                            paddingVertical: 8,
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            width: Styles.Metrics.WIDTH - 80
                          }}
                        >
                          <Text
                            style={{
                              color: Styles.Color.PRIMARY_DARK,
                              fontSize: 18,
                              shadowColor: '#000',
                              shadowOffset: { width: 0.8, height: 0.8 },
                              shadowOpacity: 1,
                              shadowRadius: 3,
                              marginBottom: 5,
                              fontWeight: 'bold',
                              elevation: 5,
                            }}
                          >
                            kkk
                          </Text>

                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='location-on' size={18} color={Styles.Color.PRIMARY_DARK} />
                            <Text
                              style={{
                                color: Styles.Color.PRIMARY_DARK,
                                fontSize: 16,
                                shadowColor: '#000',
                                shadowOffset: { width: 0.8, height: 0.8 },
                                shadowOpacity: 1,
                                shadowRadius: 3,
                                elevation: 5,
                              }}
                            >
                            kkk
                            </Text>
                          </View>
                        </View>
                      </ImageBackground>

                    </View>
                  </TouchableOpacity>
                )
              }}
              sliderWidth={Styles.Metrics.WIDTH - 40}
              itemWidth={Styles.Metrics.WIDTH - 40}
              autoplay
              layout='tinder'
            /> */}
          </FeaturedEventContainer>

          
        </Content>
      </Container>
    </Container>
  )
}
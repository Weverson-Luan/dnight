import React, { Component } from 'react'

import { Styles } from '../../common/styles';
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { ImageBackground, Text, View } from 'react-native'
import { PrimaryButton } from '../../components/PrimaryButton'
import { useState } from 'react';
import { 
    Screen,
    Title,
} from "./styles";


export function Slider({navigation}){
 const  slider= [
        {
            img: require('../../assets/images/slider/drinks.png'),
            text: 'Conheça os melhores bares'
        },
        {
            img: require('../../assets/images/slider/party.png'),
            text: 'Temos as melhores opções'
        },
        {
            img: require('../../assets/images/slider/events.png'),
            text: 'Vamos encontrar o melhor local'
        },
        {
            img:  require('../../assets/images/slider/pubs.png'),
            text: "Agora você precisa entrar para continuar"
        }
    ]

const [activeSlide, setActiveSlide] = useState(0);

  let login = false;
  if (activeSlide === 3) {
      login = true;
  }
  return (
    <Screen>
    <Carousel
        data={slider}
        onSnapToItem={(index) => setActiveSlide(index)}
        inactiveSlideScale={1}
        activeAnimationType={'spring'}
        inactiveSlideShift={1}
        renderItem={({ item }) => {
            return (
                <ImageBackground style={{ height: '100%', width: '100%' }} source={item.img}>
                    <View style={{
                        flex: 1,
                        padding: 16,
                        backgroundColor: 'rgba(0,0,0,0.6)',

                    }}>
                        <View style={{ flex: 1 }}>
                        </View>
                        <View>
                            {!login ?
                                <View>
                                    <Title>{item.text}</Title>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <View style={{ flex: 1, height: 4, backgroundColor: 'rgba(255, 255, 255, 1)' }} />
                                    </View>
                                </View> :
                                <View>
                                    <Title>{item.text}</Title> 
                                    <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <View style={{ flex: 1, height: 4, backgroundColor: 'rgba(255, 255, 255, 1)' }} />
                                    </View>
                                    <View>
                                        <PrimaryButton onPress={() => {
                                          navigation.navigate("Login")
                                        }} title={"FAZER LOGIN"} color={'error'} size='lg' radius={4} />

                                    </View>
                                </View>
                            }

                        </View>
                        <View>
                            <Pagination
                                dotsLength={slider.length}
                                activeDotIndex={activeSlide}
                                dotStyle={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    marginHorizontal: 8,
                                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                                }}
                                inactiveDotOpacity={0.4}
                                inactiveDotScale={0.6} />
                        </View>
                    </View>
                </ImageBackground>
 
            )
        }}
        sliderWidth={Styles.Metrics.WIDTH}
        itemWidth={Styles.Metrics.WIDTH}
        layout={'default'}
    />

</Screen>
  )
}
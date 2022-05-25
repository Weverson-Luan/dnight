import React, { useState } from "react";
import { TouchableOpacity, Text, View, ImageBackground } from "react-native";
import Carousel from "react-native-snap-carousel";

import { Heading, Spinner } from "native-base";

// icons-vector-icons
import Icon from "react-native-vector-icons/MaterialIcons";

// i18n
import i18n from "../../i18n";

//commons
import { Styles } from "../../common/styles";

//styled-components
import {
  Container,
  Content,
  FeaturedEventContainer,
  imageBackground,
  imageText,
  imageText2,
  imageView,
} from "./styles";

export function ListEvents() {
  const [dataEvent, setDataEvent] = useState({
    chatRooms: [],
    loading: true,
    loadingFeatureEvents: true,
    featureEvents: [],
    featuredEvent: [],
    allEvents: [],
    coordinates: {
      lat: 0,
      lng: 0,
    },
    eventDistance: 0,
  });

  return (
    <Container>
      <Content>
        {/* Featured Events */}
        <Heading
          size="md"
          adjustsFontSizeToFit
          style={{ color: Styles.Color.PRIMARY_DARK, marginBottom: 15 }}
        >
          {i18n.t("labels.featured_event")}
        </Heading>
        <FeaturedEventContainer>
          {dataEvent.loadingFeatureEvents && (
            <Spinner
              color="white"
              size={"sm"}
              style={{ position: "absolute", alignSelf: "center" }}
            />
          )}

          <Carousel
            data={dataEvent.featureEvents}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity activeOpacity={0.9}>
                  <ViewCarousel>
                    <ImageBackground
                      borderRadius={20}
                      source={{ uri: item.eventImage }}
                      style={imageBackground}
                    >
                      <View style={imageView}>
                        <Text style={imageText}>kkkk</Text>

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Icon
                            name="location-on"
                            size={18}
                            color={Styles.Color.PRIMARY_DARK}
                          />
                          <Text style={imageText2}>kkkk</Text>
                        </View>
                      </View>
                    </ImageBackground>
                  </ViewCarousel>
                </TouchableOpacity>
              );
            }}
            sliderWidth={Styles.Metrics.WIDTH - 40}
            itemWidth={Styles.Metrics.WIDTH - 40}
            autoplay
            layout="tinder"
          />
        </FeaturedEventContainer>
        <Heading
          size="md"
          adjustsFontSizeToFit
          style={{
            color: Styles.Color.PRIMARY_DARK,
            marginTop: 30,
            marginBottom: 15,
          }}
        >
          {i18n.t("labels.featured_event")}
        </Heading>
        <FeaturedEventContainer>
          {dataEvent.loadingFeatureEvents && (
            <Spinner
              color="white"
              size={"sm"}
              style={{ position: "absolute", alignSelf: "center" }}
            />
          )}

          <Carousel
            data={state.allEvents}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity activeOpacity={0.9}>
                  <ViewCarousel>
                    <ImageBackground
                      borderRadius={20}
                      source={{ uri: item.eventImage }}
                      style={imageBackground}
                    >
                      <View style={imageView}>
                        <Text style={imageText}>kkk</Text>

                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Icon
                            name="location-on"
                            size={18}
                            color={Styles.Color.PRIMARY_DARK}
                          />
                          <Text style={imageText2}>kkk</Text>
                        </View>
                      </View>
                    </ImageBackground>
                  </ViewCarousel>
                </TouchableOpacity>
              );
            }}
            sliderWidth={Styles.Metrics.WIDTH - 40}
            itemWidth={Styles.Metrics.WIDTH - 40}
            autoplay
            layout="tinder"
          />
        </FeaturedEventContainer>
      </Content>
    </Container>
  );
}

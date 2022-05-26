import React from "react";
import { View, Image } from "react-native";
import { TouchableRipple } from "react-native-paper";

//icons-vector-icons
import Icon from "react-native-vector-icons/MaterialIcons";

//i18n
import i18n from "../../i18n";
import { useNavigation } from "@react-navigation/native";

//styles
import { Styles } from "../../common/styles";

//styles-components
import {
  Screen,
  Container,
  ContainerImage,
  Content,
  ToolbarView,
  ItemDisabled,
  ItemEnabled,
  Form,
  Line,
  InnerLine,
  FormTitle,
  Name,
  Birth,
  SimpleText,
  //styles native
  touchableRippleBorderRadius,
  imageProfile,
} from "./styles";

export function Profile({ props }) {
  const { navigate } = useNavigation();

  const data = {
    picture:
      "https://i0.wp.com/br.nacaodamusica.com/wp-content/uploads/2020/08/luccas-carlos.png",
    username: "Everton Dev",
    birthDate: "10/02/22",
    phone: "21 98736-8749",
    email: "evertondev@gmail.com",
  };
  return (
    <Screen>
      <Container>
        <ToolbarView>
          <TouchableRipple
            borderless={true}
            rippleColor="rgba(255, 255, 255, .32)"
            style={touchableRippleBorderRadius}
          >
            <Icon name={"edit"} size={28} />
          </TouchableRipple>

          <TouchableRipple
            borderless={true}
            rippleColor="rgba(255, 255, 255, .32)"
            style={touchableRippleBorderRadius}
            onPress={() => navigate("Login")}
          >
            <Icon name={"logout"} size={28} />
          </TouchableRipple>
        </ToolbarView>

        <View style={{ marginTop: "20%" }}>
          <ContainerImage>
            <Image source={{ uri: data.picture }} style={imageProfile} />
            <Content>
              <Name>{data.username}</Name>
              <Birth>{data.birthDate}</Birth>
            </Content>
          </ContainerImage>

          <Form>
            <FormTitle>{i18n.t("profile.contact")}</FormTitle>
            <ItemDisabled>
              <Icon name="phone" size={17} color={Styles.Color.GREY_DARK} />
              <SimpleText>{data.phone}</SimpleText>
            </ItemDisabled>
            <ItemDisabled>
              <Icon name="email" size={17} color={Styles.Color.GREY_DARK} />
              <SimpleText>{data.email}</SimpleText>
            </ItemDisabled>

            <Line>
              <InnerLine />
            </Line>

            <ItemEnabled onPress={() => console.log("favorite")}>
              <Icon name="favorite" size={17} color={Styles.Color.GREY_DARK} />
              <SimpleText>{i18n.t("profile.favorites")}</SimpleText>
            </ItemEnabled>

            <ItemEnabled
              onPress={() => props.navigation.navigate("REPORT_SCREEN")}
            >
              <Icon name="report" size={17} color={Styles.Color.GREY_DARK} />
              <SimpleText>{i18n.t("profile.report")}</SimpleText>
            </ItemEnabled>

            <ItemEnabled
              onPress={() =>
                props.navigation.navigate("TERMS_SCREEN", { login: false })
              }
            >
              <Icon name="policy" size={17} color={Styles.Color.GREY_DARK} />
              <SimpleText>{i18n.t("profile.terms")}</SimpleText>
            </ItemEnabled>
          </Form>
        </View>
      </Container>
    </Screen>
  );
}

import { Dimensions } from "react-native";
import styled from "styled-components";
import { Styles } from "../../common/styles";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const Screen = styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${Styles.Color.SCREEN_BACKGROUND};
`;

export const Content = {
  borderWidth: 1,
  borderRadius: 10,
  backgroundColor: "#e0e0e0",
  height: '100%',
  width: "90%",
  marginVertical: 14,
  marginHorizontal: "10%",
};

export const placeholderTerm = {
  margin: 20,
  color: Styles.Color.PLACEHOLDER,
};

export const contextButton = {
  width: SCREEN_WIDTH * 0.8,
  flexDirection: "column",
  justifyContent: "space-evenly",
  marginBottom: "4%",
};


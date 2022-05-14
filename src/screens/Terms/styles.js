import { Dimensions } from "react-native";
import styled from "styled-components";
import { Styles } from "../../common/styles";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

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
  height: "55%",
  width: "90%",
  marginVertical: 24,
  marginHorizontal: "10%",
};

export const contextText = {
  flex: 1,
  width: SCREEN_WIDTH * 0.8,
  marginHorizontal: "10%",
  flexDirection: "column",
  justifyContent: "space-evenly",
};

export const placeholderTerm = {
  margin: 8,
  color: Styles.Color.PLACEHOLDER,
};

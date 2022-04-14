import styled from "styled-components/native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { Styles } from "../../commom/styles";

export const Container = styled.View`
  flex: 1;
  background-color: ${Styles.Color.SCREEN_BACKGROUND};
  padding-bottom: ${getBottomSpace()}px;
`;
export const Header = styled.View`
  justify-content: space-evenly;
  align-items: center;
  background-color: ${Styles.Color.PRIMARY};
  padding-bottom: 10px;
`;

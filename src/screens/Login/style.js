import styled from "styled-components/native";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { Styles } from "../../common/styles";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${Styles.Color.PRIMARY};
  padding-bottom: ${getBottomSpace()};

`;

export const Header = styled.View`
  justify-content: space-evenly;
  align-items: center;
  background-color: ${Styles.Color.PRIMARY};
  padding-bottom: 10px;
`;

export const Title = styled.Text`
  font-size: ${Styles.FontSize.NORMAL}px;
  color: #fff;
`;

// estilização do css no native base
export const formControl = {
  width: "80%",
  marginVertical: 40,
};

export const stackInput = {
  backgroundColor: "#465881",
  borderRadius: 10,
  paddingHorizontal: 8,
};

export const flexRow = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 10,
  paddingHorizontal: 3,
};

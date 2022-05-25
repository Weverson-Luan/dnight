import styled from "styled-components";
import { Styles } from "../../common/styles";

export const Screen = styled.SafeAreaView`
  background-color: ${Styles.Color.SCREEN_BACKGROUND};
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.ScrollView`
  padding: 8px;
`;

export const ContentImage = styled.View`
  margin-top: 15px;
  justify-content: center;
  align-items: center;
`;
export const ContentForm = styled.View`
  margin-top: 8%;
`;

export const Title = styled.Text`
  font-size: ${Styles.FontSize.NORMAL};
  color: #fff;
`;

export const stackInput = {
  backgroundColor: "#FFF",
  borderRadius: 10,
  paddingHorizontal: 8,
};
export const containerInput = {
  backgroundColor: "#FFF",
  flexDirection: "row",
  borderRadius: 10,
  paddingHorizontal: 8,
};

// estilização do css no native base

export const inputError = {
  alignSelf: "center",
  marginTop: 10,
};
export const formControl = {
  width: "80%",
  marginVertical: 40,
};
export const maskInput = {
  paddingLeft: 10,
  color: Styles.Color.PLACEHOLDER,
  width: "80%",
};
export const stack = {
  borderColor: "transparent",
  backgroundColor: Styles.Color.TEXT_PRIMARY,
  borderRadius: 10,
  marginTop: 8,
  paddingHorizontal: 8,
  paddingVertical: 4,
  flexDirection: "column",
};
export const stackBirthDate = {
  width: "100%",
  backgroundColor: "#FFF",
  marginTop: 10,
  paddingHorizontal: 3,
  paddingVertical: 3,
  borderRadius: 10,
};
export const stackDistance = {
  alignSelf: "stretch",
  borderColor: "transparent",
  justifyContent: "flex-start",
};
export const stackDistanceFlexRow = {
  borderColor: "transparent",
  flexDirection: "row",
  alignItems: "center",
};
export const contentForm = {
  marginVertical: 25,
  marginHorizontal: 15,
  justifyContent: "space-between",
};
export const flexRow = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 10,
  paddingHorizontal: 3,
};
export const stackInputMask = {
  borderColor: "transparent",
  backgroundColor: Styles.Color.TEXT_PRIMARY,
  borderRadius: 10,
  marginTop: 8,
  paddingHorizontal: 10,
  paddingVertical: 10,
  flexDirection: "row",
  alignItems: "center",
};

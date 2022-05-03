import styled from "styled-components";
import { flexDirection } from "styled-system";
import { Styles } from "../../commom/styles";

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
  flexDirection: 'row',
  borderRadius: 10,
  paddingHorizontal: 8,
};

// estilização do css no native base
export const formControl = {
  width: "80%",
  marginVertical: 40,
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
  flexDirection: 'row',
  alignItems: 'center'
};
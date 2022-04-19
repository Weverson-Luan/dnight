import styled from "styled-components";
import { Styles } from "../../commom/styles";

export const Screen = styled.SafeAreaView`
  background-color: ${Styles.Color.SCREEN_BACKGROUND};
  height: 100%;
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

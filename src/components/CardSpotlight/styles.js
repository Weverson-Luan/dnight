import styled from "styled-components";

//commons
import { Styles } from "../../common/styles";

export const Wrapper = styled.View`
  width: 100%;

  position: relative;


  align-items: center;
  justify-content: center;
`;
export const WrapperImage = styled.View`
  width: 100%;

`;
export const Image = styled.Image`
  width: 100%;
  height: 300px;

  border-radius: 14px;
`;
export const WrapperSpotlightDesc = styled.TouchableOpacity`
  width: 90%;
  height: 80px;

  margin-top: 18px;

  background-color: ${Styles.Color.SCREEN_BACKGROUND};
  border-radius: 6px;

  padding: 12px;

  position: absolute;
  bottom: 14px;
`;
export const TextSpotlightText = styled.Text`
  font-size: 16px;
  font-weight: bold;

  color: ${Styles.Color.PRIMARY_DARK};
`;
export const WrapperLocation = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;

  margin-top: 4px;

`;
export const TextSpotlightLocation = styled.Text`
  font-size: 16px;
  font-weight: bold;

  color: ${Styles.Color.PRIMARY_DARK};

  margin-left: 2px;
`;
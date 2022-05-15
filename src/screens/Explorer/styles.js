import styled from 'styled-components/native';

//styles
import { Styles } from '../../common/styles';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Styles.Color.SCREEN_BACKGROUND};
  padding: 8px;
  margin-top: 30px;
`;
export const Content = styled.View`
`;
export const Welcome = styled.Text`
  margin-left: 8px;
  font-size: 24px;
  color: ${Styles.Color.GREY_DARK};
  font-weight: 600;
`;
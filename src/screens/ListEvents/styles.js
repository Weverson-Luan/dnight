import styled from 'styled-components/native';

//commons
import { Styles } from '../../common/styles';


export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Styles.Color.SCREEN_BACKGROUND};
  margin-top: 30px;
`;
export const Content = styled.View`
  flex: 1;
  padding: 0 20px 10px;
`;
export const FeaturedEventContainer = styled.View`
  background-color: #323232;
  height: 40%;
  width: 100%;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 20px;
  align-self: center;
  align-items: center;
  justify-content: center;
`;
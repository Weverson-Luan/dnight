import styled from 'styled-components'
import { Styles } from '../../common/styles'



export const Content = styled.View`
 flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Styles.Color.PRIMARY};
`;

export const Screen = styled.View`
flex: 1;
`;

export const Banner = styled.View`
  background-color: ${Styles.Color.ERROR};
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 4px 0 4px;
`;

export const Status = styled.Text`
  color: ${Styles.Color.TEXT_PRIMARY};
`;
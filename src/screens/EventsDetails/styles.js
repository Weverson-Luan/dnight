import styled from 'styled-components';
import {  Styles } from '../../common/styles';

export const Screen = styled.SafeAreaView`
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  background-color: #f5f5f5;
`;
export const Name = styled.Text`
  color: ${Styles.Color.PRIMARY};
  font-size: 28;
  text-align: left;
  margin: 0 0 8px;
  font-weight: bold;
`;
export const CircleButton = styled.TouchableOpacity`
  background-color: #e0e0e0;
  width: 50px;
  height: 50px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;
export const Description = styled.Text`
  color: ${Styles.Color.PLACEHOLDER};
  font-size: 18;
`;

// estilização do css no native base

export const scrollView = {
  marginBottom: 15
};

export const imageBackground = {
  height: 250, 
  paddingHorizontal: 20, 
  paddingTop: 15 
};

export const touchableRipple = {
  borderRadius: 50,
};

export const content = {
  width: 30,
  height: 30 
};

export const contentMain = {
  marginTop: 30, 
  marginHorizontal: 15
};

export const contentLocation = {
  flexDirection: 'row',
  alignItems: 'center' 
}

export const contentFooter = {
  flexDirection: 'row',
  marginTop: 15,
  justifyContent: 'center'
};

export const contentMap = {
  marginTop: 15,
  paddingHorizontal: 15
};

export const TitleDescription = {
  fontWeight: 'bold', 
  fontSize: 15,
  color: Styles.Color.PLACEHOLDER
};

export const TitleEventAbout = {
  fontSize: 16,
  color: Styles.Color.PLACEHOLDER 
};

export const contentText = {
  marginTop: 10
};

export const TitleContact = {
  fontWeight: 'bold', 
  fontSize: 15,
  color: Styles.Color.PLACEHOLDER
};

export const TitlePhone = {
  fontSize: 16,
  color: Styles.Color.PLACEHOLDER 
};

export const contentMapView = {
  marginTop: 10, 
  width: Styles.Metrics.WIDTH - 30 
};

export const titleLocaTion = {
  fontWeight: 'bold',
  fontSize: 15,
  color: Styles.Color.PLACEHOLDER
};

export const mapView = {
  width: '100%', 
  height: 250, 
  marginTop: 5
};

export const imageMap = {
  width: 36, 
  height: 36
};

export const circleButton = {
  marginLeft: 5
}
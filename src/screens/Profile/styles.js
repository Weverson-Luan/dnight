import styled from 'styled-components';
import { Styles } from '../../common/styles';

export const Screen = styled.SafeAreaView`
  height: 100%;
  padding: 24px 24px 24px 24px;
  background-color: ${Styles.Color.SCREEN_BACKGROUND};
  margin-top: 30px;
`;
export const Container = styled.ScrollView`
`;
export const ContainerImage = styled.View`
  margin-top: 15%;
  width: 100%;
  height: 150px;
  align-items: center;
  justify-content: flex-end;
`;
export const Content = styled.View`
  align-items: center;
  margin-top: 15px;
`;
export const ToolbarView = styled.View` 
  flex-direction: row;
  justify-content: flex-end;
`;
export const ItemDisabled = styled.View`
  margin-top: 2%;
  align-items: center;
  flex-direction: row;
  padding: 10px 8px 10px 8px;
  background-color: #fff;
  border-radius: 8px;
`;
export const ItemEnabled = styled.TouchableOpacity`
  margin-top: 2%;
  align-items: center;
  flex-direction: row;
  padding: 10px 8px 10px 8px;
  background-color: #fff;
  border-radius: 8px;
`;
export const Form = styled.View`
  margin-top: 15px;
  width: 100%;
`;
export const Line = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px 15px 0 15px;
`;
export const InnerLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: rgba(146, 146, 146, 0.6);
`;
export const FormTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${Styles.Color.GREY};
`;
export const Name = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${Styles.Color.GREY};
`;
export const Birth = styled.Text`
  font-size: 18px;
  color: ${Styles.Color.GREY};
`;
export const SimpleText = styled.Text`
  font-size: 17px;
  color: ${Styles.Color.GREY};
  margin: 0px 15px 0px 15px;
`;

//styles native
export const touchableRippleBorderRadius = {
  borderRadius: 50,
  marginHorizontal: 14
};
export const imageProfile = {
  backgroundColor: '#e0e0e0',
  width: 115, 
  height: 115, 
  borderRadius: 25
};
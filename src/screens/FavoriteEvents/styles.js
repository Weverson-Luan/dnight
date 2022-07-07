import styled from 'styled-components/native';

//styles-common
import { Styles } from '../../common/styles';

// i18n
import i18n from '../../i18n';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Styles.Color.SCREEN_BACKGROUND};


`;
export const ContentList = styled.View`
 margin-left: 15px;
 margin-right: 15px;

 padding-bottom: 32px;
`;
export const ViewFilter = styled.View`
  width: 87%;
  padding: 10px 16px;
  background-color: transparent;
  flex-direction: row;
`;
export const InputSearch = styled.TextInput.attrs({
  placeholder: i18n.t('placeholders.search'),
  placeholderTextColor: Styles.Color.PLACEHOLDER,
  returnKeyType: 'send',
  autoCapitalize: 'none',
  autoCorrect: false,
})`
  width: 100%;
  background-color: #fff;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 10px 0px;

`;
export const SearchIcon = styled.View`
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
  justify-content: flex-start;
  border-top-left-radius:4px;
  border-bottom-left-radius:4px;
`;
export const Item = styled.TouchableOpacity`
  padding: 6px;
  flex-direction: row;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 8px;
  margin-top: 8px;
`;
export const Content = styled.View`
  justify-content: space-between;
  
  padding-left: 8px;
`;
export const Image = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 5px;
`;
export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Styles.Color.GREY};
`;
export const SimpleText = styled.Text`
  font-size: 15px;
  color: ${Styles.Color.GREY};
`;
//styles native
export const filter = {
  flexDirection: 'row',
  alignItems: 'center'
}


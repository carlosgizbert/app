import styled from 'styled-components/native'
import { Platform, StatusBar } from 'react-native'

const isAndroid = Platform.OS === 'android'

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};

  background-color: #fafafa;
`

export const CategoriesContainer = styled.View`
  height: 73px;
  margin-top: 34px;
`

export const MenuContainer = styled.View`
  flex: 1;
`

export const Footer = styled.View`
  min-height: 110px;
  padding: 16px 24px;

  background-color: #fff;
`

export const CenteredContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const FooterContainer = styled.SafeAreaView`
`

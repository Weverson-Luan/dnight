import React from 'react'
import { Platform } from 'react-native'
import { NetworkConsumer } from 'react-native-offline'
import styled from 'styled-components'

import i18n from '../i18n'
import { Styles } from '../../commom/styles'

const Banner = styled.View`
  position: absolute;
  top: ${Platform.OS === 'ios' ? 20 : 0};
  background-color: ${Styles.Color.ERROR};
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 4px 0 4px;
`

const Status = styled.Text`
  color: ${Styles.Color.TEXT_PRIMARY};
`

export const NetworkStatus = () => (
  <NetworkConsumer>
    {({ isConnected }) =>
      isConnected ? null : (
        <Banner>
          <Status>{i18n.t('messages.networkOffline')}</Status>
        </Banner>
      )
    }
  </NetworkConsumer>
)


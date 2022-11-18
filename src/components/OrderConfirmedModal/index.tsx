import { Modal } from 'react-native'

import { StatusBar } from 'expo-status-bar'
import { Text } from '../Text'
import { CheckCircle } from '../Icons/CheckCircle'

import * as S from './styles'

interface OrderConfirmedModal {
  visible: boolean
  onClickClose: () => void
}

export function OrderConfirmedModal({ visible, onClickClose }: OrderConfirmedModal) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
    >
      <StatusBar style="light" />
      <S.Container>
        <CheckCircle />
        <Text size={24} weight="600" color='#fff' style={{ marginTop: 12 }}>Pedido confirmado</Text>
        <Text color='#fff' opacity={0.9} style={{ marginTop: 8 }}>O pedido já entrou na fila de produção!</Text>
        <S.OkButton onPress={onClickClose}>
          <Text color='#D73035' weight='600'>Ok</Text>
        </S.OkButton>
      </S.Container>
    </Modal>
  )
}

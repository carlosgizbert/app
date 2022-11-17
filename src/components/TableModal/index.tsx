import { useState } from 'react'
import { Modal, TouchableOpacity, Platform } from 'react-native'
import Button from '../Button'
import { Close } from '../Icons/Close'
import { Text } from '../Text'

import * as S from './styles'

interface TableModal {
  visible: boolean
  onClickClose: () => void
}

export function TableModal({ visible, onClickClose }: TableModal) {
  const [table, setTable] = useState('')

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <S.Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'} >
        <S.ModalBody>
          <S.Header>
            <Text weight='600'>Informe a mesa</Text>
            <TouchableOpacity onPress={onClickClose}><Close color='#666' /></TouchableOpacity>
          </S.Header>
          <S.Form>
            <S.Input
              keyboardType='numeric'
              placeholder="Número da mesa"
              placeholderTextColor="#667"
              onChangeText={setTable}
            />
          </S.Form>
          <Button label="Salvar" onPress={() => alert(`Mesa ${table}`)} disabled={!table} />
        </S.ModalBody>
      </S.Overlay>
    </Modal>
  )
}

import { useState } from 'react'
import { Modal, TouchableOpacity, Platform } from 'react-native'
import Button from '../Button'
import { Close } from '../Icons/Close'
import { Text } from '../Text'

import * as S from './styles'

interface TableModal {
  visible: boolean
  onClickClose: () => void
  onSubmit: (table: string) => void
}

export function TableModal({ visible, onClickClose, onSubmit }: TableModal) {
  const [table, setTable] = useState('')

  const handleSave = () => {
    setTable('')
    onSubmit(table)
    onClickClose()
  }

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
          <Button
            label="Salvar"
            disabled={!table}
            onPress={() => handleSave()}
          />
        </S.ModalBody>
      </S.Overlay>
    </Modal>
  )
}

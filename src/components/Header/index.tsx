import { TouchableOpacity } from 'react-native'
import { Text } from '../Text'

import * as S from './styles'

interface Header {
  selectedTable: string
  onClickCancel: () => void
}

export function Header({ selectedTable, onClickCancel }: Header){
  return (
    <S.Container>
      {!selectedTable && (
        <><Text size={14} opacity={0.9}>Bem vindo(a) ao</Text><Text size={24} weight="700">
          WAITER
          <Text size={24}>APP</Text>
        </Text></>
      )}
      {selectedTable && (
        <S.OrderContent>
          <S.OrderHeader>
            <Text size={24} weight="600">Pedido</Text>
            <TouchableOpacity onPress={onClickCancel}>
              <Text size={14} weight='600' color='#D73035'>Cancelar pedido</Text>
            </TouchableOpacity>
          </S.OrderHeader>
          <S.Table>
            <Text>{selectedTable}</Text>
          </S.Table>
        </S.OrderContent>
      )}
    </S.Container>
  )
}

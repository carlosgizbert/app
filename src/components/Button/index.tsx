import { Text } from '../Text'
import * as S from './styles'

interface Button {
  label: string
  onPress: () => void
  disabled?: boolean
}

export default function Button({ label, onPress, disabled }: Button) {
  return (
    <S.Container onPress={onPress} disabled={disabled}>
      <Text weight='600' color='#fff'>{label}</Text>
    </S.Container>
  )
}

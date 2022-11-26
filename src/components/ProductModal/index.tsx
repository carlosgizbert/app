import { FlatList, Modal } from 'react-native'
import { Product } from '../../types/Product'
import { Close } from '../Icons/Close'
import { Text } from '../Text'
import { Button } from '../Button'

import { formatCurrency } from '../../utils/formatCurrency'

import * as S from './styles'

interface ProductModal {
  visible: boolean
  onClickClose: () => void
  product: null | Product
  onClickAddToCart: (product: Product) => void
}

export function ProductModal({ visible, onClickClose, product, onClickAddToCart }: ProductModal) {
  if (!product) {
    return null
  }

  const handleAddToCart = () => {
    onClickAddToCart(product!)
    onClickClose()
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClickClose}
    >
      <S.Image source={{
        uri: `http://192.168.15.12:3001/uploads/${product.imagePath}`,
      }}>
        <S.CloseButton onPress={onClickClose}>
          <Close/>
        </S.CloseButton>
      </S.Image>
      <S.ModalBody>
        <S.Header>
          <Text size={24} weight="700">{product.name}</Text>
          <Text color="#666" style={{ marginTop: 8 }}>{product.description}</Text>
        </S.Header>
        {!!product.ingredients.length && (
          <S.IngredientsContainer>
            <Text weight="600">Ingedientes</Text>
            <FlatList
              data={product.ingredients}
              keyExtractor={ingredient => ingredient._id}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 16 }}
              renderItem={({ item: ingredient }) => (
                <S.Ingredient>
                  <Text>{ingredient.icon}</Text>
                  <Text size={14} color="#667" style={{ marginLeft: 16 }}>{ingredient.name}</Text>
                </S.Ingredient>
              )}
            />
          </S.IngredientsContainer>
        )}
      </S.ModalBody>
      <S.Footer>
        <S.FooterContainer>
          <S.Price>
            <Text size={14}>Preço</Text>
            <Text size={20} weight="600">{formatCurrency(product.price)}</Text>
          </S.Price>
          <Button label="Adicionar ao pedido" onPress={() => handleAddToCart()} />
        </S.FooterContainer>
      </S.Footer>
    </Modal>
  )
}

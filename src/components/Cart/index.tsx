import { useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { CartItem } from '../../types/CartItem'
import { formatCurrency } from '../../utils/formatCurrency'
import { MinusCircle } from '../Icons/MinusCircle'
import { PlusCircle } from '../Icons/PlusCircle'
import { Text } from '../Text'
import Button from '../Button'
import { Product } from '../../types/Product'
import { OrderConfirmedModal } from '../OrderConfirmedModal'

import * as S from './styles'

interface Cart {
  cartItems: CartItem[]
  onAdd: (product: Product) => void
  onDecrement: (product: Product) => void
  onConfirmOrder: () => void
}

export function Cart({ cartItems, onAdd, onDecrement, onConfirmOrder }: Cart) {
  const [showModal, setShowModal] = useState<boolean>(false)

  const total = cartItems.reduce((acc, cartItem) => {
    return acc = cartItem.quantity * cartItem.product.price
  }, 0)

  const handleConfirmOrder = () => {
    setShowModal(true)
  }

  const handleOk = () => {
    onConfirmOrder()
    setShowModal(false)
  }

  return (
    <>
      <OrderConfirmedModal visible={showModal} onClickClose={() => handleOk()} />
      <FlatList
        data={cartItems}
        keyExtractor={cartItem => cartItem.product._id}
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 24, maxHeight: 150 }}
        renderItem={({ item: cartItem }) => (
          <S.Item>
            <S.ProductContainer>
              <S.Image
                source={{
                  uri: `http://192.168.15.12:3001/uploads/${cartItem.product.imagePath}`,
                }}
              />
              <S.QuantityContainer>
                <Text size={14} color="#667">{cartItem.quantity}x</Text>
              </S.QuantityContainer>
              <S.ProductDetails>
                <Text size={14} weight="600">{cartItem.product.name}</Text>
                <Text size={14} color="#667" style={{ marginTop: 4 }}>{formatCurrency(cartItem.product.price)}</Text>
              </S.ProductDetails>
            </S.ProductContainer>
            <S.Actions>
              <TouchableOpacity onPress={() => onAdd(cartItem.product)} style={{ marginRight: 24 }}><PlusCircle /></TouchableOpacity>
              <TouchableOpacity onPress={() => onDecrement(cartItem.product)}><MinusCircle/></TouchableOpacity>
            </S.Actions>
          </S.Item>
        )}
      />
      <S.Summary>
        <S.TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#667">Total</Text>
              <Text size={20} weight="600">{formatCurrency(total)}</Text></>
          ) : (
            <Text color="#999">Seu carrinho está vazio</Text>
          )}
        </S.TotalContainer>
        <Button label="Confirmar pedido" onPress={() => handleConfirmOrder()} />
      </S.Summary>
    </>
  )
}

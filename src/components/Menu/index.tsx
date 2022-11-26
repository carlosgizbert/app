import { useState } from 'react'
import { FlatList } from 'react-native'

import { Text } from '../Text'
import { PlusCircle } from '../Icons/PlusCircle'

import { formatCurrency } from '../../utils/formatCurrency'
import { ProductModal } from '../ProductModal'

import { Product } from '../../types/Product'

import * as S from './styles'

interface Menu {
  onClickAddToCart: (product: Product) => void
  products: null | Product[]
}

export function Menu({ onClickAddToCart, products }: Menu) {
  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null)

  const handleOpenModal = (product: Product) => {
    setShowModal(true)
    setSelectedProduct(product)
  }

  return (
    <S.View>
      <FlatList
        data={products}
        keyExtractor={product => product._id}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ItemSeparatorComponent={S.Divider}
        renderItem={({ item: product }) => {
          return (
            <S.Product onPress={() => handleOpenModal(product)}>
              <S.ProductImage
                source={{
                  uri: `http://192.168.15.12:3001/uploads/${product.imagePath}`
                }} />
              <S.ProductDetails>
                <Text weight='600'>{product.name}</Text>
                <Text size={14} color='#667' style={{ marginVertical: 8 }}>
                  {product.description}
                </Text>
                <Text weight='600'>{formatCurrency(product.price)}</Text>
              </S.ProductDetails>
              <S.AddToCartButton onPress={() => onClickAddToCart(product)}>
                <PlusCircle />
              </S.AddToCartButton>
            </S.Product>
          )
        } } />
      <ProductModal visible={showModal} onClickClose={() => setShowModal(false)} product={selectedProduct} onClickAddToCart={onClickAddToCart} />
    </S.View>
  )
}

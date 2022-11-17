import { FlatList } from 'react-native'

import { Text } from '../Text'
import { products } from '../../mocks/products'
import { PlusCircle } from '../Icons/PlusCircle'

import { formatCurrency } from '../../utils/formatCurrency'

import * as S from './styles'

export function Menu() {
  return (
    <FlatList
      data={products}
      keyExtractor={product => product._id}
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      ItemSeparatorComponent={S.Divider}
      renderItem={({ item: product }) => {
        return (
          <S.Product>
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
            <S.AddToCartButton>
              <PlusCircle />
            </S.AddToCartButton>
          </S.Product>
        )
      }}
    />
  )
}

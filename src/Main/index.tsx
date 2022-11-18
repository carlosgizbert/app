import React, { useState } from 'react'

import { StatusBar } from 'expo-status-bar'

import Button from '../components/Button'
import { Cart } from '../components/Cart'
import { Categories } from '../components/Categories'
import { Header } from '../components/Header'
import { Menu } from '../components/Menu'
import { TableModal } from '../components/TableModal'
import { CartItem } from '../types/CartItem'

import { products as mockProducts } from '../mocks/products'

import { Product } from '../types/Product'
import { Empty } from '../components/Icons/Empty'
import { Text } from '../components/Text'

import * as S from './styles'

export default function Main() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedTable, setSelectedTable] = useState('')
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [cartItems, setCartIems] = useState<CartItem[]>([{
    quantity: 1,
    product: mockProducts[0]
  },
  {
    quantity: 2,
    product: mockProducts[7]
  }])

  const handleSubmitTable = (tableId: string) => {
    setSelectedTable(tableId)
    setShowModal(false)
  }

  const handleAddToCart = (product: Product) => {
    if(!selectedTable) {
      setShowModal(true)
    }
    setCartIems((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id)

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        })
      }

      const newCartItems = [...prevState]
      const item = newCartItems[itemIndex]

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1
      }


      return newCartItems
    })
  }

  const handleDecrementCartItem = (product: Product) => {
    setCartIems((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id)

      const item = prevState[itemIndex]
      const newCartItems = [...prevState]

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1)

        return newCartItems
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1
      }

      return newCartItems
    })
  }

  const handleResetOrder = () => {
    setSelectedTable('')
    setCartIems([])
  }

  return (
    <>
      <StatusBar style="dark" />
      <S.Container>
        <Header selectedTable={selectedTable} onClickCancel={handleResetOrder} />
        <S.CategoriesContainer>
          <Categories />
        </S.CategoriesContainer>
        {products.length > 0 ? (
          <S.MenuContainer>
            <Menu products={products} onClickAddToCart={handleAddToCart} />
          </S.MenuContainer>
        ) : (
          <S.CenteredContainer>
            <Empty />
            <Text color='#667' style={{ marginTop: 24 }}>Nenhum produto encontrado</Text>
          </S.CenteredContainer>
        )}
      </S.Container>
      <S.Footer>
        {!selectedTable && (
          <S.FooterContainer>
            <Button label="Novo pedido" onPress={() => setShowModal(true)} />
          </S.FooterContainer>
        )}
        {selectedTable && (
          <Cart
            cartItems={cartItems}
            onAdd={handleAddToCart}
            onDecrement={handleDecrementCartItem}
            onConfirmOrder={handleResetOrder}
          />
        )}
      </S.Footer>
      <TableModal visible={showModal} onClickClose={() => setShowModal(false)} onSubmit={(tableId) => handleSubmitTable(tableId)} />
    </>
  )
}
